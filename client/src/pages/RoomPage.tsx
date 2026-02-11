import { useMemo, useState } from 'react'
import { DollarSign, Package, Plus, Search, Trash, Zap } from 'lucide-react'
import {
    RoomModal,
    Input,
    Pagination,
    RoomCard,
    RoomStatsCard,
    DashBoardTitle,
    Result,
} from '../components'
import type {
    FormDataType,
    ModeType,
    CreateRoomError,
    Room
} from '../types'
import { useAuth, useRooms, useToast } from '../hooks'
import { createRoom, deleteMany, deleteRequest, updateRequest } from '../api'

export const RoomPage = () => {
    const { addToast } = useToast()
    const { session } = useAuth()

    const [search, setSearch] = useState<string>('')
    // const [filter, setFilter] = useState<FilterType>('all')
    const [roomIds, setRoomIds] = useState<string[]>([])

    // Le hook useRooms reçoit maintenant le filtre
    const { rooms, roomStats, loading, refetch } = useRooms()

    const [selectedRoomId, setSelectedRoomId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [modalMode, setModalMode] = useState<ModeType>('create')
    const [formData, setFormData] = useState<FormDataType>({
        name: '',
        color: '',
        description: '',
    })
    const [createRoomError, setCreateRoomErrors] = useState<CreateRoomError>({
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
        setRoomIds((prev) =>
            prev.includes(id)
                ? prev.filter((roomId) => roomId !== id)
                : [...prev, id]
        )
    }

    const validateCreateRoom = (): boolean => {
        const newErrors: typeof createRoomError = {
            name: '',
            color: '',
            description: '',
        }

        if (!formData.name) {
            newErrors.name = 'Nom de la pièce requis'
        }
        if (!formData.description) {
            newErrors.description = 'Description requise'
        }

        if (!formData.color) {
            newErrors.color = 'Couleur requise'
        }

        setCreateRoomErrors(newErrors)
        return !Object.values(newErrors).some(Boolean)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (modalMode === 'create') {
            if (!validateCreateRoom()) return

            setIsSubmitting(true)

            const { error } = await createRoom({
                ...formData,
                owner_id: session?.user.id,
            })

            if (!error) {
                addToast({
                    title: 'Création de pièce',
                    description: 'Pièce créée avec succès',
                    variant: 'success',
                })
                setIsSubmitting(false)
                setIsModalOpen(false)
                setFormData({
                    name: '',
                    description: '',
                    color: '#22c55e',
                })
            } else {
                addToast({
                    title: 'Erreur Création',
                    description: error.message,
                    variant: 'error',
                })
            }
        }

        if (modalMode === 'edit') {
            const { error } = await updateRequest(
                'rooms',
                formData,
                selectedRoomId
            )
            setIsSubmitting(true)

            if (!error) {
                addToast({
                    title: 'Modification',
                    description: 'Pièce modifiée avec succès',
                    variant: 'success',
                })
                setIsModalOpen(false)
                setIsSubmitting(false)
                setFormData({
                    name: '',
                    description: '',
                    color: '#22c55e',
                })
            } else {
                addToast({
                    title: 'Erreur modification',
                    description: error.message,
                    variant: 'error',
                })
            }
        }

        await refetch()
    }

    // Handle editing a room by pre-filling the modal form
    const handleEditRoom = (room: Room) => {
        setFormData({
            name: room.name,
            description: room.description,
            color: room.color,
        })
        setSelectedRoomId(room.id)
        setModalMode('edit')
        setIsModalOpen(true)
    }

    // Handle input changes for the modal form
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    const handleDeleteRoom = async (id: string) => {
        const { error } = await deleteRequest('rooms', id)
        if (!error) {
            addToast({
                variant: 'success',
                title: 'Suppression',
                description: 'Room supprimée avec succès',
            })
        } else {
            addToast({
                variant: 'error',
                title: 'Suppression',
                description: "Une erreur s'est produite",
            })
        }
        await refetch()
    }

    const handleDeleteMany = async () => {
        const { error } = await deleteMany('rooms', roomIds)
        if (!error) {
            addToast({
                variant: 'success',
                title: 'Suppression',
                description: 'Rooms supprimées avec succès',
            })
        } else {
            addToast({
                variant: 'error',
                title: 'Suppression',
                description: "Une erreur s'est produite",
            })
        }
        setRoomIds([])
        await refetch()
    }

    // Handle search input changes for filtering rooms
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setSearch(value)
    }

    // Handle filter change
    // const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     setFilter(e.target.value as FilterType)
    //     console.log(filter)
    // }

    // Memoized filtered data based on search input
    const filteredData = useMemo(() => {
        return rooms.filter((room) =>
            room.name.toLowerCase().includes(search.toLowerCase())
        )
    }, [search, rooms])

    if (loading) {
        return <div>Chargement...</div>
    }

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
                <RoomStatsCard
                    icon={Package}
                    title={'Pièces'}
                    value={roomStats?.total_rooms ?? 0}
                    color="text-green-800"
                    border="border border-green-200"
                    bg="bg-green-50"
                />

                <RoomStatsCard
                    icon={DollarSign}
                    title={'Dépenses'}
                    value={roomStats?.total_price_items ?? 0}
                    color="text-blue-800"
                    border="border border-blue-200"
                    bg="bg-blue-50"
                />

                <RoomStatsCard
                    icon={Zap}
                    title={'Articles'}
                    value={roomStats?.total_items ?? 0}
                    color="text-yellow-800"
                    border="border border-yellow-200"
                    bg="bg-yellow-50"
                />
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
                        {/* <select
                            className="border border-gray-300 cursor-pointer rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none transition"
                            name="filter"
                            onChange={handleFilterChange}
                            value={filter}
                            title="Filtrer par"
                        >
                            <option value="all">Tous</option>
                            <option value="most-recent">Plus récent</option>
                            <option value="most-expensive">Plus cher</option>
                            <option value="least-expensive">Moins cher</option>
                            <option value="most-articles">
                                Plus d'articles
                            </option>
                        </select> */}
                        {roomIds.length > 0 && (
                            <button
                                className="bg-red-100 py-2 px-4 text-red-700 border border-red-700 hover:bg-red-200 rounded-lg hover:shadow-lg flex items-center gap-2 transition text-sm md:text-base cursor-pointer"
                                onClick={handleDeleteMany}
                            >
                                <Trash size={16} />
                                Supprimer ({roomIds.length})
                            </button>
                        )}
                    </div>
                    {roomIds.length > 0 && (
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
                                            key={room?.id}
                                            room={room}
                                            onEdit={() => handleEditRoom(room)}
                                            onChecked={() =>
                                                handleCheckedRoom(room.id)
                                            }
                                            checked={roomIds.includes(room.id)}
                                            onDelete={() =>
                                                handleDeleteRoom(room.id)
                                            }
                                        />
                                    ))}
                                </div>
                            ) : (
                                <Result
                                    title="Aucune Pièce"
                                    message="Vous n'avez encore créé de pièce. Commencez par en créer une."
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
                    isSubmitting={isSubmitting}
                    errors={createRoomError}
                    onClose={() => setIsModalOpen(false)}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    formData={formData}
                />
            )}
        </div>
    )
}