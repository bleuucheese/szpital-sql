import instance from "./axios"

export const uploadImage = async (formData: FormData) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/media`, { // Adjust the URL as needed
        method: 'POST',
        body: formData,
    });
    const result = await response.json()
    return result
}