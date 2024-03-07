export interface MapperInterface<T, K, J> {
  toDb(entity: T): K
  toDomain(entity: J): T
}
