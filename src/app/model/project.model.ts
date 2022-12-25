export type CoverProject = {
    id: number,
    project_id: number,
    path: string,
    order: number,
    created_at: string,
    updated_at: string
}

export type Project = {
  id: number,
  link: string,
  order: number,
  description: string,
  images: CoverProject[],
  created_at: string,
  updated_at: string
}
