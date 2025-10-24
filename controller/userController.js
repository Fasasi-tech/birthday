const User = require('../models/userModels');

const getAllUsers = async (req, res) =>{
    try{

        const users = await User.find({}).select('-password -passwordChangedAt -__v')
        const usersCount = users.length

        res.status(200).json({message:'users returned successfully!',
            data: users,
            count: usersCount
        })
    }catch(error){
          return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        })
    }
    

}

const getSingleUser = async (req, res) =>{

    const  singleUser = await User.findById(req.params.id).select('-passwordChangedAt -__v')

    if (!singleUser){
        return res.status(400).json({message: 'user not found!'})
    }

    res.status(200).json({message:'user found successfully', 
        data: singleUser
    })
}

const deactivateUser = async (req, res) =>{
    try{
       
        const deactivate =  await User.findByIdAndUpdate(req.params.id, {active:false},  {runValidators:true, new:true})

        if (!deactivate){
            return res.status(404).json({
                message:'user not found!'
            })
        }

          return res.status(200).json({
            message: 'User deactivated successfully',
            user: deactivate
        });
    } catch(error){
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message    
        })
    }
}

const reactivateUser = async (req, res) =>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,  {active:true},  {runValidators:true, new:true})

        // if (!user){
        //     return res.status(404).json({
        //         message:'user not found or already active'
        //     })
        // }

          return res.status(200).json({
            message: 'User activated successfully',
            user
        });
    }catch(error){
         return res.status(500).json({
            message: 'Internal server error',
            error: error.message    
        })
    }
}

module.exports={getAllUsers, getSingleUser, deactivateUser, reactivateUser}