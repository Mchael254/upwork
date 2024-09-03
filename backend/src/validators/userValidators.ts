import joi from 'joi';

//register validation
export const userRegisterValidationSchema = joi.object({
    userName:joi.string().required().min(2).max(30),
    email:joi.string().email({
        minDomainSegments:2,tlds : {
            allow :['ke','com']

        }
    }),
    password:joi.string().required().pattern(
        new RegExp ('^[a-zA-Z0-9!@#%$&*().]{0,30}$')
    )

});