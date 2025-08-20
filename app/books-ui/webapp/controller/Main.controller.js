sap.ui.define(["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/ui/model/json/JSONModel"], function (Controller, MessageToast, JSONModel) {
  "use strict";
  return Controller.extend("books.ui.controller.Main", {
    onInit: async function () {
      const url = this.getOwnerComponent().getModel().sServiceUrl;
    console.log("url", url);
    const data = await axios.get("/catalog/Books")
    const libri = data.data.value;
    
    // Debug per verificare la struttura
    console.log("Struttura completa data:", data);
    console.log("Array libri:", libri);
    console.log("Primo libro:", libri[0]);
    console.log("Proprietà primo libro:", Object.keys(libri[0]));

    this.getView().setModel(new JSONModel(libri), "Libri");
    console.log("Modello impostato:", this.getView().getModel("Libri").getData());

    },
    onAdd: function () {
      const oModel = this.getView().getModel();
      const oList = oModel.bindList("/Books");
      oList.create({ title: "Nuovo libro", author: "Autore", stock: 1, price: 9.99 });
      oModel.submitBatch("$auto").then(() => MessageToast.show("Libro creato"))
        .catch(e => { MessageToast.show("Errore: " + e.message); console.error(e); });
    },
    addNewBook: async function () {
    try {
        const numeroRandom = Math.floor(Math.random() * (100000 - 10 + 1)) + 10;
        let obj = {
            "price": 29.9,
            "stock": 5,
            "title": "Clean Code",
            "author": "Robert C. Martin",
            "createdAt": new Date().toISOString(),
            "createdBy": "anonymous",
            "modifiedAt": new Date().toISOString(),
            "modifiedBy": "anonymous"
        };

        // Effettua la POST e aspetta la risposta
        const response = await axios.post("/catalog/Books", obj);
        console.log("Libro aggiunto:", response.data);

        // Opzione 1: Ricarica tutti i dati (più sicuro)
        await this.reloadBooks();

        // Opzione 2: Aggiungi solo il nuovo libro al modello (più veloce)
        // this.addBookToModel(response.data || obj);

        // Mostra messaggio di successo
        sap.m.MessageToast.show("Libro aggiunto con successo!");

    } catch (error) {
        console.error("Errore durante l'aggiunta del libro:", error);
        sap.m.MessageToast.show("Errore durante l'aggiunta del libro");
    }
},

// Funzione helper per ricaricare i dati
reloadBooks: async function() {
    try {
        const data = await axios.get("/catalog/Books");
        const libri = data.data.value;
        this.getView().getModel("Libri").setData(libri);
        console.log("Dati ricaricati:", libri);
    } catch (error) {
        console.error("Errore nel ricaricamento:", error);
    }
},

// Funzione helper per aggiungere solo il nuovo libro (alternativa più veloce)
addBookToModel: function(newBook) {
    const oModel = this.getView().getModel("Libri");
    const currentData = oModel.getData();
    currentData.push(newBook);
    oModel.setData(currentData);
    oModel.refresh(); // Forza il refresh della UI
}
  });
});