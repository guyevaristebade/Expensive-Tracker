// hooks/useItems.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createItemWithFiles, deleteItem } from '@/api'

export const useItems = () => {
    const queryClient = useQueryClient()

    const postItem = useMutation({
        mutationFn: createItemWithFiles,
        onSuccess: (_data, variables) => {
            // Invalider la room précise
            queryClient.invalidateQueries({
                queryKey: ['room', variables.roomId],
            })
        },
    })

    const deleteItemQuery = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['rooms'],
            })
        },
    })

    return { postItem, deleteItemQuery }
}
