import {auth} from './Firebase'

class Autenticador{
    
    constructor(){
        
    }

    static async cerrarSesionUsuario(){
        try {
            await auth.signOut()
        }
        catch (error) {
            throw error
        }
    }

    static async emailEstaRegistrado(email){
        try {
            let rest = await auth.fetchSignInMethodsForEmail(email)
            if (rest.length > 0){
                console.log("REST = ")
                console.log(rest)
                return true
            }
            else{
                return false
            }   
        } catch (error) {
            console.log(error)
        }  
    }

    static async iniciarSesionUsuario(email, contrasena){
        try {
            let respuesta = await auth.signInWithEmailAndPassword(email, contrasena)
            return respuesta.user
        }
        catch (error) {
            throw error
        }
    }

    static obtenerMensajeError(error){
        let code = error.code
        switch(code){
            case 'auth/invalid-email':          return 'El email ingresado no es valido'
            case 'auth/email-already-in-use':   return 'El email ingresado ya se encuentra en uso'
            case 'auth/weak-password' :         return 'La contraseña ingresada debe tener mínimo 6 caracteres'
            case 'auth/user-not-found':         return 'El usuario no se encuentra registrado'
            case 'auth/wrong-password':         return 'La contraseña no corresponde con el usuario ingresado'
            case 'auth/argument-error':         return 'Error ocasionado por causas desconocidas aun...'
            default: return code
        }
    }

    static async registrarUsuario(email, contrasena){
        try{
            let respuesta = await auth.createUserWithEmailAndPassword(email, contrasena)            
            return respuesta.user
        }
        catch(error){
            throw error
        }
    }
}

export default Autenticador