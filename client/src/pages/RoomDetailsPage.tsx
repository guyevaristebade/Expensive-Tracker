import { useEffect, useState } from 'react'
import {
    CardItem,
    DashBoardTitle,
    Input,
    ProductModal,
    Result,
} from '../components'
import { RoomCardDetail } from '../components/dashboard/rooms/details/RoomDetailCard'
import { Search } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { formatDate } from '../utils'
import type { Room, RoomDetailStats } from '../types'
import { supabase } from '../lib'

export const RoomDetailsPage = () => {
    const { roomId } = useParams()
    const navigate = useNavigate()
    const [room, setRoom] = useState<Room>()
    const [roomDetailStat, setRoomDetailStat] = useState<RoomDetailStats>()
    const [loading, setLoading] = useState<boolean>(true)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [openMode, setOpenMode] = useState<'edit' | 'create'>('create')

    const toggleOpen = () => {
        setIsOpen(!isOpen)
        setOpenMode(openMode)
    }

    useEffect(() => {
        const fetchRoom = async () => {
            setLoading(true)
            const { data } = await supabase
                .from('rooms')
                .select('*, items(*)')
                .eq('id', roomId)

            if (data) setRoom(data[0])

            setLoading(false)
        }

        const fetchRoomDetailStats = async () => {
            setLoading(true)
            // rajouter error et le gérer plus tard
            const { data } = await supabase
                .from('room_detail_stats')
                .select()
                .eq('room_id', roomId)

            if (data) setRoomDetailStat(data[0])

            setLoading(false)
        }

        fetchRoom()
        fetchRoomDetailStats()
    }, [roomId])

    if (loading) return <div>Loading .....</div>

    return (
        <div className="space-y-10">
            <div className="flex flex-col gap-4 items-start md:flex-row md:items-center md:justify-between w-full">
                <DashBoardTitle
                    title={room?.name}
                    subtitle={room?.description || ''}
                    isDetailed={true}
                    color={room?.color || '#FFF234'}
                    onClick={() => navigate(-1)}
                />

                <button
                    style={{
                        backgroundColor: room?.color,
                        borderColor: room?.color,
                    }}
                    className="text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                    onClick={toggleOpen}
                >
                    Ajouter un article
                </button>
            </div>

            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <RoomCardDetail
                        amount={roomDetailStat?.total_price ?? 0}
                        variant="purple"
                        label="Total"
                        currency="€"
                    />
                    <RoomCardDetail
                        amount={roomDetailStat?.total_items ?? 0}
                        variant="blue"
                        label="Articles"
                    />
                    <RoomCardDetail
                        amount={
                            typeof roomDetailStat?.avg_price === 'number'
                                ? roomDetailStat.avg_price
                                : 0
                        }
                        variant="green"
                        label="Moyenne"
                        currency="€"
                    />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                    <RoomCardDetail
                        amount={roomDetailStat?.most_expensive_item_price ?? 0}
                        variant="pink"
                        label="Plus cher"
                        currency="€"
                        description={roomDetailStat?.most_expensive_item_name}
                    />
                    <RoomCardDetail
                        amount={roomDetailStat?.least_expensive_item_price ?? 0}
                        variant="yellow"
                        label="Moins cher"
                        currency="€"
                        description={roomDetailStat?.least_expensive_item_name}
                    />
                </div>
            </div>
            <div className="space-y-4 border-t border-b border-gray-300 py-8 hidden">
                <Input
                    label=""
                    name="name"
                    // onChange={handleSearchChange}
                    // value={search}
                    type="text"
                    placeholder="Recherher un article"
                    IconComponent={Search}
                />
                <div className="flex gap-4 items-center flex-wrap">
                    <div className="flex gap-4 items-center flex-wrap">
                        {/* <select
                            className="border border-gray-300 cursor-pointer rounded-lg px-4  py-2 text-gray-900 placeholder-gray-500 focus:outline-none transition"
                            name="filter"
                            onChange={(e) => {
                                console.log(e.target.value)
                            }}
                            value=""
                            title="Filtrer par"
                        >
                            <option value="">Choissisez</option>
                            <option value="all">Tous</option>
                            <option value="most-recent">Plus recent</option>
                            <option value="most-last">Plus ancien</option>
                            <option value="most-expensive">Plus chère</option>
                            <option value="least-expensive">Moins chère</option>
                            <option value="most-articles">
                                Plus d'articles
                            </option>
                        </select> */}
                        {/* <button className="  bg-red-100 py-2 px-4 text-red-700 border border-red-700 hover:bg-red-200  rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer">
                            <Trash size={16} />
                            Supprimer
                        </button> */}
                        <button
                            style={{
                                backgroundColor: room?.color,
                                borderColor: room?.color,
                            }}
                            className=" py-2 px-4 text-white font-bold hover:bg-gray-100 rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                        >
                            Ajouter un article
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
                {/* <RoomItemsList roomId={roomId} /> */}
                {room && room.items && room?.items?.length > 0 ? (
                    room.items.map((item) => (
                        <div>
                            <CardItem
                                key={item.name}
                                image={
                                    item.image_url
                                        ? item.image_url
                                        : 'https://placehold.co/600x400'
                                }
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                purchaseDate={formatDate(item.purchase_date)}
                                onEdit={() => alert('edit')}
                                onDelete={() => alert('delete')}
                                onMoreInfo={() => alert('info')}
                            />
                        </div>
                    ))
                ) : (
                    <Result
                        title="Aucune produit dans cette Pièce"
                        message="Vous n'avez encore créé d'article. Commencez par en créer un."
                        action={
                            <button
                                style={{
                                    backgroundColor: room?.color,
                                    borderColor: room?.color,
                                }}
                                className=" text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                                onClick={toggleOpen}
                            >
                                Ajouter un article
                            </button>
                        }
                    />
                )}
            </div>

            {isOpen && (
                <ProductModal
                    roomId={roomId as string}
                    mode={openMode}
                    onClose={toggleOpen}
                />
            )}
        </div>
    )
}
