import { Experience, Image, Project } from '@prisma/client'
import { create } from 'zustand'



type ModalType = 'initial-modal' | 'login-modal' | 'alert-modal' |'image-modal' | 'project-modal' | 'experience-modal'


type DataType = {
  refresh?:boolean
  url?:string
  back?:string,
  message?:string,
  project?:Project & {images:Image[]}
  experience?:Experience
  }
type Store = {
  open: boolean,
  modalType:ModalType | null,
  data?:DataType
  onOpen: (modalType:ModalType,data?:DataType) => void,
  onClose:()=>void
}

export const useModal = create<Store>()((set) => ({
  open: false,
  modalType:null,
  data:{},
  onOpen: (modalType,data={}) => set({ open: true,modalType,data} ),
  onClose:()=>set({open:false,modalType:null})
}))


