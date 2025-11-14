import type { LucideIcon } from 'lucide-react'

export interface BreadcrumbItem {
  title: string
  href: string
}

export interface NavItem {
  title: string
  href: string
  icon?: LucideIcon
  isActive?: boolean
}

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  email_verified_at: string | null
  created_at: string
  updated_at: string
}

export interface OutletContext {
    breadcrumbs: BreadcrumbItem[]
    setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
}