export interface ICreateRatingImcDTO {
  height: number
  weight: number
  imc: number
  classification: TClassification
  degree: TDegree
  user_rating_id: string
  user_student_id: string
}