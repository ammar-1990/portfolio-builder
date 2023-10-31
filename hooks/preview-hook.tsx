import { create } from 'zustand'

type Store = {
  preview: boolean
  setPreivew: (val:boolean) => void
}

export const usePreview = create<Store>()((set) => ({
  preview: true,
  setPreivew: (value:boolean) => set({preview:value}),
}))

