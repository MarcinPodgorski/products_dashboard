import { AppDataSource } from "../data-source";
import { Category } from "../entities/Category";
import { Product } from "../entities/Product";
import axios from 'axios'

export async function fetchAndSaveProducts() {
    const productRepository = AppDataSource.getRepository(Product);
    const categoryRepository = AppDataSource.getRepository(Category);

    try {
        const { data } = await axios.get('https://api.escuelajs.co/api/v1/products');
        
        for (const item of data) {
            const existing = await productRepository.findOne({ where: { id: item.id}})
            if (existing) continue;

            let category = await categoryRepository.findOne({ where: { name: item.category.name }});
            if (!category) {
                category = categoryRepository.create({
                    id: item.category?.id,
                    name: item.category?.name,
                    image: item.category?.image
                });
                await categoryRepository.save(category);
            }
            const product = productRepository.create({
                id: item.id,
                title: item.title,
                description: item.description,
                price: item.price,
                images: item.images,
                category: category
              });
        
              await productRepository.save(product);
              
            }
    } catch (error) {
        console.log(error)
    }
}