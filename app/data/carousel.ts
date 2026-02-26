import axios from 'axios'
import {CarouselItem} from "@/app/types/carousel-types";
import {BASE_API} from "@/app/data/api";


//GET CAROUSEL BY ID
export const getCarouselById = async (id : number) => {
    const response = await axios.get(`${BASE_API}/carousel/${id}`)
    return response.data.data;
}

//CREATE CAROUSEL
export const createCaorusel = async ( carouselData : CarouselItem) => {

    const response = await axios.post(`${BASE_API}/carousel`, {
        imageCarousel: carouselData.imageCarousel,
        imageCarouselPublicId: carouselData.imageCarouselPublicId,
    })
    return response.data.data;
}



