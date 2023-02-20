import prisma from "../../db"
export const getProducts = async (req,res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include:{
            products: true
        }
    });

    res.json({data: user.products});

}
export const getProduct = async (req,res)=>{
    const id = req.params.id;
    console.log(req.user.id)
    const user = await prisma.product.findFirst({
        where:{
            id:id,
            belongsToId: req.user.id
        }
    })
    res.json({data:user})
}

export const createProduct = async (req,res) => {
     const product = await prisma.product.create({
        data:{

            name:req.body.name,
            belongsToId: req.user.id
        }
     })
     res.json({data: product})
}

export const updateProduct = async (req,res)=>{
    const id = req.params.id;
    const updatedProduct = await prisma.product.update({
        where: {
           id_belongsToId:{
                id,
                belongsToId:req.user.id
           }
            
        },
        data: {
           name: req.body.name
        }
    })
  res.json({data: updatedProduct})
}

export const deleteProduct = async (req,res) => {
    const id = req.params.id;
    const product = await prisma.product.delete({
        where:{
            id_belongsToId:{
                id,
                belongsToId:req.user.id
           }
            
        }
    })
    res.json({product})
}