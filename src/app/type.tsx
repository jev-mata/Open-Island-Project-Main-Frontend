export type Pages = "Question" | "Landing" | "Recommendation"| "Loading"| "Save";
export type QnA = {
    question: string,
    option: string[],
    selected:number
}
export interface Destination {
    id: number;
    name: string;
    description: string;
    address: string;
    thumbnail: string;
    tags: string[];
}
export const categoriesOptions = ["Cultural and Heritage Tourism", "Nature and Eco-tourism", "Adventure Tourism", "Gastronomy", "Recreational Tourism", "Religious and Spiritual Tourism", "Accommodation"];
export const tagsOptions = ["Adventure tourism", "Recreational tourism", "Religious and spiritual tourism", "Nature and eco-tourism", "Local activities", "Wildlife encounters", "Foodie adventure", "Hidden gems", "Luxury stays", "Short-Term Rental", "Residential accommodations"];
