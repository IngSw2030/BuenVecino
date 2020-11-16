import ManejadorBD from "./Firebase/ManejadorBD"

class Chat{

    constructor(infoChat){
        this.state = {
            ...infoChat
        }
    }

    actualizarChat(){
        
    }

    iniciarChat(){
        ManejadorBD.escucharActualizacionesDocumento("Chats", this.idFirsebase, actualizarChat)
    }

    


}

export default Chat