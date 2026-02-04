import { Plus, Search, Trash } from 'lucide-react'
import {
    RoomModal,
    Input,
    Pagination,
    RoomCard,
    RoomStatsCard,
    DashBoardTitle,
    Result,
} from '../components'
import { roomStatsCardData, roomCardData } from '../utils'
import { useMemo, useState } from 'react'
import type { RoomType, FormDataType, ModeType } from '../types'
import { useToast } from '../hooks'

export const RoomPage = () => {
    const { addToast } = useToast()
    const [search, setSearch] = useState<string>('')
    const [roomId, setRoomId] = useState<string[]>([])

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalMode, setModalMode] = useState<ModeType>('create')
    const [formData, setFormData] = useState<FormDataType>({
        id: '',
        name: '',
        color: '',
        description: '',
    })

    // Handle opening the modal for creating a new room
    const handleCreateRoom = () => {
        setFormData({
            name: '',
            description: '',
            color: '#22c55e',
        })
        setModalMode('create')
        setIsModalOpen(true)
    }

    // Handle checking/unchecking a room for bulk actions
    const handleCheckedRoom = (id: string) => {
        setRoomId((prev) =>
            prev.includes(id)
                ? prev.filter((roomId) => roomId !== id)
                : [...prev, id]
        )
    }

    // Handle form submission for creating or editing a room
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // Submit logic here
        if (modalMode === 'create') {
            console.log('Creating room:', formData)
            setFormData({
                name: '',
                color: '',
                description: '',
            })
            setTimeout(() => {
                addToast({
                    variant: 'success',
                    description: 'Catégorie créée avec succès !',
                    title: 'Room créée',
                })
                setIsModalOpen(false)
            }, 3000)
        } else {
            console.log('Editing room:', formData)
            setFormData({
                name: '',
                color: '',
                description: '',
            })
            setTimeout(() => {
                addToast({
                    variant: 'success',
                    description: 'Catégorie modifiée avec succès !',
                    title: 'Room modifiée',
                })
                setIsModalOpen(false)
            }, 3000)
        }
    }

    // Handle editing a room by pre-filling the modal form
    const handleEditRoom = (room: RoomType) => {
        setFormData({
            id: room.id,
            name: room.name,
            description: room.description,
            color: room.color,
        })
        setModalMode('edit')
        setIsModalOpen(true)
    }

    // Handle input changes for the modal form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Handle search input changes for filtering rooms
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
    }

    // Memoized filtered data based on search input
    const filteredData = useMemo(() => {
        const filtered =
            roomCardData &&
            roomCardData.filter((room) =>
                room.name.toLowerCase().startsWith(search.toLowerCase())
            )
        return filtered
    }, [search])

    return (
        <div className="h-screen w-full flex flex-col gap-10 space-y-10">
            <div className="flex items-center justify-between">
                <DashBoardTitle
                    title="Mes pièces"
                    subtitle="Gérez vos catégories de dépenses"
                />
                <div>
                    <button
                        className="bg-linear-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                        onClick={handleCreateRoom}
                    >
                        <Plus className="text-white" size={16} />
                        Ajouter une pièce
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {roomStatsCardData.map((item, i) => (
                    <RoomStatsCard
                        key={item.title + i}
                        title={item.title}
                        value={item.value}
                        icon={item.icon}
                        color={item.color}
                        border={item.border}
                        bg={item.bg}
                    />
                ))}
            </div>

            <div className="space-y-4 border-t border-b border-gray-300 py-8">
                <Input
                    label=""
                    name="name"
                    onChange={handleSearchChange}
                    value={search}
                    type="text"
                    placeholder="Nom de la pièce"
                    IconComponent={Search}
                />
                <div className="flex gap-4 items-center flex-wrap">
                    <div className="flex gap-4 items-center flex-wrap">
                        <select
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
                            <option value="most-recent">Plus Recent</option>
                            <option value="most-expensive">Plus chère</option>
                            <option value="least-expensive">Moins chère</option>
                            <option value="most-articles">
                                Plus d'articles
                            </option>
                        </select>
                        {roomId.length > 0 && (
                            <button
                                className="  bg-red-100 py-2 px-4 text-red-700 border border-red-700 hover:bg-red-200  rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                                // onClick={() => setRoomId([])}
                            >
                                <Trash size={16} />
                                Supprimer ({roomId.length})
                            </button>
                        )}
                    </div>
                    {roomId.length > 0 && (
                        <span className="text-orange-500 font-semibold">
                            ⚠️ Attention toute suppression est définitive
                        </span>
                    )}
                </div>
            </div>
            <main>
                <Pagination data={filteredData}>
                    {(paginatedData) => (
                        <>
                            {paginatedData.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 py-20">
                                    {paginatedData.map((room) => (
                                        <RoomCard
                                            key={room.id}
                                            room={room}
                                            updatedAt="Mis à jour le 16 janv. 2024"
                                            onEdit={() => handleEditRoom(room)}
                                            onChecked={() =>
                                                handleCheckedRoom(room.id)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Result
                                    title="Aucune Pièce"
                                    message="Vous n’avez encore crée de pièce. Commencez par en créer une."
                                    // icon={}
                                    action={
                                        <button
                                            className="bg-linear-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                                            onClick={handleCreateRoom}
                                        >
                                            Ajouter une pièce
                                        </button>
                                    }
                                />
                            )}
                        </>
                    )}
                </Pagination>
            </main>
            {isModalOpen && (
                <RoomModal
                    mode={modalMode}
                    onClose={() => setIsModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    formData={formData}
                />
            )}
        </div>
    )
}
