import { createStore } from "vuex";
import db from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    invoiceData: [],
    showInvoiceModal: null,
    editInvoice: null,
    invoicesLoaded: false,
  },
  getters: {},
  mutations: {
    TOGGLE_INVOICE_MODAL(state) {
      const nextShowInvoiceModal = !state.showInvoiceModal;

      state.showInvoiceModal = nextShowInvoiceModal;
    },
    TOGGLE_MODAL(state) {
      state.modalActive = !state.modalActive;
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    SET_INVOICE_DATA(state, payload) {
      state.invoiceData.push(payload);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const querySnapshot = await getDocs(collection(db, "invoices"));

      querySnapshot.forEach((doc) => {
        if (!state.invoiceData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };

          commit("SET_INVOICE_DATA", data);
        }
      });

      commit("INVOICES_LOADED");
    },
  },
  modules: {},
});
