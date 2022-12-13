export interface IUpdateRatingImcDTO {
  id: string
  height?: number
  weight?: number
  imc?: number
  classification?: TClassification
  degree?: TDegree
  user_rating_id?: string
  user_student_id?: string
}