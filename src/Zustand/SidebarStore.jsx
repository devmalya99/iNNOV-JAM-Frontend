import {create} from "zustand";

// Define the Zustand store
const UseSidebarStore = create((set) => ({
  viewSidebar: false,
  setViewSidebar: (visible) => set({ viewSidebar: visible }),
}));

export default UseSidebarStore;
