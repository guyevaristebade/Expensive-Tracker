import { supabase } from '@/lib/supabase'

export const fetchItemById = async (itemId: string) => {
    const { data, error } = await supabase
        .from('items')
        .select('*')
        .eq('id', itemId)
        .single()

    if (error) throw error

    return data
}

// export const uploadFile = async (file: File, filePath: string) => {
//     const { error } = await supabase.storage
//         .from('item-files')
//         .upload(filePath, file)

//     if (error) throw error

//     const { data: publicURL } = supabase.storage
//         .from('item-files')
//         .getPublicUrl(filePath)

//     if (publicURL.publicUrl === null)
//         throw new Error('Failed to retrieve public URL')

//     return publicURL.publicUrl
// }

export const uploadFile = async (file: File, folder: string) => {
    const bucket = 'item-files'

    if (!file) throw new Error('No file provided')

    // Normaliser le nom
    const safeName = `${Date.now()}-${file.name.replace(/\s/g, '_')}`

    const path = `${folder}/${safeName}`

    const { error } = await supabase.storage.from(bucket).upload(path, file)

    if (error) throw new Error(`Upload failed: ${error.message}`)

    const { data: publicURL } = supabase.storage.from(bucket).getPublicUrl(path)

    if (!publicURL.publicUrl) throw new Error('Failed to get public URL')

    return publicURL.publicUrl
}

export const createItemWithFiles = async ({
    formData,
    roomId,
    userId,
}: {
    formData: any
    roomId: string
    userId: string
}) => {
    let invoiceUrl = formData.invoice_url
    let imageUrl = formData.image_url

    // Upload invoice si file
    if (formData.invoice_file) {
        const path = `invoices/${userId}/${Date.now()}-${formData.invoice_file.name}`
        invoiceUrl = await uploadFile(formData.invoice_file, path)
    }

    // Upload image si file
    if (formData.image_file) {
        const path = `images/${userId}/${Date.now()}-${formData.image_file.name}`
        imageUrl = await uploadFile(formData.image_file, path)
    }

    const { data, error } = await supabase
        .from('items')
        .insert({
            name: formData.name,
            price: parseFloat(formData.price),
            purchase_date: formData.purchase_date,
            description: formData.description,
            invoice_url: invoiceUrl,
            image_url: imageUrl,
            room_id: roomId,
            owner_id: userId,
        })
        .select()
        .single()

    if (error) throw error

    return data
}

export const deleteItem = async (itemId: string) => {
    const { error } = await supabase.from('items').delete().eq('id', itemId)

    if (error) throw error

    return true
}
