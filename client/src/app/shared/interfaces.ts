export interface User {
  email: string
  password: string  
  city?: string
  date?: Date
}

export interface City {
  name: string,
  _id?: string
}

export interface Message {
  message: string
}

export interface Author {
  name: string
  imageSrc?: string
  user?: string
  _id?: string
}

export interface Book {
  name: string
  cost: number
  author: string
  user?: string
  _id?: string
  quantity?: number
}

export interface Order {
  date?: Date
  order?: number
  user?: string
  list: OrderBook[]
  _id?: string
}

export interface OrderBook {
  name: string
  cost: number
  quantity: number
  _id?: string
}

export interface Filter {
  start?: Date
  end?: Date
  order?: number
}

// export interface OverviewPage {
//   orders: OverviewPageItem
//   gain: OverviewPageItem
// }

// export interface OverviewPageItem {
//   percent: number
//   compare: number
//   yesterday: number
//   isHigher: boolean
// }

// export interface AnalyticsPage {
//   average: number
//   chart: AnalyticsChartItem[]
// }

// export interface AnalyticsChartItem {
//   gain: number
//   order: number
//   label: string
// }
