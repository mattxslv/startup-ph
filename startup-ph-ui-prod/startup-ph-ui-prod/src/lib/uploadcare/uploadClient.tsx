import { UploadClient } from '@uploadcare/upload-client'

const uploadClient = new UploadClient({
  publicKey: process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY!
})

export default uploadClient;
