import React from 'react'
import { showModal } from '../modal'

export const showPreviewModal = (projectSlug: string) => {
  showModal({
    id: 'preview-modal',
    title: 'Preview',
    size: "lg",
    component: PreviewModal,
    titleClose: true,
    props: {
      projectSlug,
    }
  })
}

interface Props {
  projectSlug: string
  onClose: () => void
}

function PreviewModal({ projectSlug }: Props) {
  return (
    <div className="h-[500px] relative">
      <iframe
        className="absolute inset-0 h-full w-full"
        src={`/projects/${projectSlug}?preview=1`}
        title="preview"
      />
    </div>
  )
}
