import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();
import axios, { AxiosResponse } from "axios";

const requestCategory = async () => {
  const { data }: any = await axios
    .get("https://the-funko-api.herokuapp.com//api/v1/categories")
    .then((response: AxiosResponse) => response.data);

  return data;
};

const requestProduct = async () => {
  let array: any[] = [];
  for (let i = 1; i <= 3; i++) {
    const { data }: any = await axios
      .get(`https://the-funko-api.herokuapp.com//api/v1/items/?page=${i}`)
      .then((response: AxiosResponse) => response.data);
    array.push(data);
  }
  let array2 = array.flat();

  return array2;
};

// export const createProduct = async () => {
//   const { data }: any = await axios
//     .get("https://the-funko-api.herokuapp.com//api/v1/categories")
//     .then((response: AxiosResponse) => response.data);
//     return data;
// };

// export const findCategory = (pro: [], name: String) => {
//   let result = pro.find((elemento: any) => elemento.attributes.name === name);
//   return result;
// };

export const init = async () => {
  try {
    const allProducts = await requestProduct();

    allProducts.map(async (product: any) => {
      await prisma.product.create({
        data: {
          title: product.attributes.title,
          number: product.attributes.number,
          Category: {
            connectOrCreate: {
              create: { name: product.attributes.category },
              where: {
                name: product.attributes.category,
              },
            },
          },
          Brand: {
            create: { name: product.attributes.brand },
          },
          License: {
            create: { name: product.attributes.license },
          },
        },
      });
    });
  } catch (error) {
    console.log(error);
  }
};
