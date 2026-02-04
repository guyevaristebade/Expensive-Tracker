import React from 'react'
import { CardItem, DashBoardTitle, Input } from '../components'
import { RoomCardDetail } from '../components/dashboard/rooms/details/RoomDetailCard'
import { Search, Trash } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
// import { useParams } from 'react-router-dom'

export const RoomDetailsPage = () => {
    // const { roomId } = useParams();
    const navigate = useNavigate()

    return (
        <div className="space-y-10">
            <DashBoardTitle
                title="Nom de la Room"
                subtitle="description de la room"
                isDetailed={true}
                color="#FFF234"
                onClick={() => navigate(-1)}
            />

            <div className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <RoomCardDetail
                        amount="560"
                        variant="purple"
                        label="Total"
                        currency="€"
                    />
                    <RoomCardDetail
                        amount="6"
                        variant="blue"
                        label="Articles"
                    />
                    <RoomCardDetail
                        amount="93.33"
                        variant="green"
                        label="Moyenne"
                        currency="€"
                    />
                </div>
                <div className=" grid grid-cols-1 md:grid-cols-2 gap-2">
                    <RoomCardDetail
                        amount="180"
                        variant="pink"
                        label="Plus cher"
                        currency="€"
                        description="Lunettes de soleil"
                    />
                    <RoomCardDetail
                        amount="20"
                        variant="yellow"
                        label="Moins cher"
                        currency="€"
                        description="Chaussettes (lot)"
                    />
                </div>
            </div>
            <div className="space-y-4 border-t border-b border-gray-300 py-8">
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
                            <option value="most-recent">Plus recent</option>
                            <option value="most-last">Plus ancien</option>
                            <option value="most-expensive">Plus chère</option>
                            <option value="least-expensive">Moins chère</option>
                            <option value="most-articles">
                                Plus d'articles
                            </option>
                        </select>
                        {/* {roomId.length > 0 && ( */}
                        <button className="  bg-red-100 py-2 px-4 text-red-700 border border-red-700 hover:bg-red-200  rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer">
                            <Trash size={16} />
                            {/* Supprimer ({roomId.length}) */}
                            Supprimer
                        </button>
                        <button
                            style={{
                                backgroundColor: '#FFF234',
                                borderColor: '#FFF234',
                            }}
                            className=" py-2 px-4 text-gray-900 font-semibold hover:bg-gray-100 rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                        >
                            Ajouter un article
                        </button>
                        {/* )} */}
                    </div>
                    {/* {roomId.length > 0 && (
                        <span className="text-orange-500 font-semibold">
                            ⚠️ Attention toute suppression est définitive
                        </span>
                    )} */}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* List of items in the room */}
                {/* <RoomItemsList roomId={roomId} /> */}
                <CardItem
                    image="https://medias.collectorsquare.com/images/products/403422/00pp-montre-audemars-piguet-royal-oak-tourbillon-en-or-rose-ref-25977or-vers-2008.jpg"
                    name="Montre Audemars Piguet"
                    description="Montre de luxe Audemars Piguet Royal Oak Tourbillon en or rose."
                    price={2499}
                    purchaseDate="12 janv. 2024"
                    onEdit={() => console.log('edit')}
                    onDelete={() => console.log('delete')}
                    onMoreInfo={() => console.log('info')}
                />
                <CardItem
                    image="https://www.apple.com/v/macbook-air/x/images/overview/routers/compare_mba_13_15__caznvrb61zyu_large_2x.png"
                    name="MacBook Pro M2"
                    description="Ordinateur portable Apple pour le travail et le développement."
                    price={2499}
                    purchaseDate="12 janv. 2024"
                    onEdit={() => console.log('edit')}
                    onDelete={() => console.log('delete')}
                    onMoreInfo={() => console.log('info')}
                />
                <CardItem
                    image="https://www.celio.com/dw/image/v2/BGBR_PRD/on/demandware.static/-/Sites-celio-master/default/dw5f956c4a/hi-res/179792-956-MUTEK_BLACK-WEB3-1.jpg?sw=862&sh=1108&q=85"
                    name="Veste Celio"
                    description="Au sec et au chaud sous la pluie avec cette veste imperméable."
                    price={89.99}
                    purchaseDate="12 janv. 2024"
                    onEdit={() => console.log('edit')}
                    onDelete={() => console.log('delete')}
                    onMoreInfo={() => console.log('info')}
                />
            </div>
        </div>
    )
}
