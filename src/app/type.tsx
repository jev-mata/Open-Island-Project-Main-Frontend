export type Pages = "Question" | "Landing" | "Recommendation" | "Loading" | "Save";
export type QnA = {
    question: string,
    option: string[],
    selected: number
}
export interface Destination {
    id: number;
    name: string;
    description: string;
    address: string;
    thumbnail: string;
    tags: string[];
}
export interface TagsDestination {
    id: number;
    Name: string;
    Image_URL: string;
}
export type UserData = {
    id: number;
    fname: string;
    lname: string;
    email: string;
}
export type ProfileType = {
    id: number;
    user_id: number;
    username: string;
    profile_picture: string;
    bio: string;
}

export type DestinationCol = {
    id?: number;
    thumbnail: string;
    name: string;
    author?: string;
    description?: string;
    tags?: string[];
    rows?: number;
    cols?: number;
}

export type UserIslands = {
    id: number;
    user_id: number;
    destination_id: number;
    destination: DestinationCol;
}
export type UserPost = {
    id: number;
    group_id?: number;
    user_id?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
    dateTraveled: Date;
    user?: Users;
    user_island_group: User_Island_Group;
    tagImages:string[];
    user_island_photo: User_Island_Photo[];
}
export type User_Island_Photo = {
    id?: number;
    post_id?: number;
    thumbnail: string;
    created_at?: Date;
    updated_at?: Date;
}
export type User_Island_Group = {
    id?: number;
    user_id?: number;
    content?: string;
    created_at?: Date;
    updated_at?: Date;
    user?: Users;
}
export type Users = {
    id?: number;
    fname?: string;
    lname?: string;
    email?: string;
    created_at?: Date;
    updated_at?: Date;
    profile: Profile;
}
export type Profile = {
    id?: number;
    user_id?: string;
    username: string;
    profile_picture?: string;
    bio?: string;
    created_at?: Date;
    updated_at?: Date;
}
export type Favorate = {
    id?: number;
    destination_id?: number;
    created_at?: Date;
    updated_at?: Date;
    destination?: DestinationCol;
    rows: number;
    cols: number;
}
export type UserIslandsDestination = {
    id: number;
    name: string;
    description: string;
    address: string;
    thumbnail: string;
    tags: string[];
    destination: DestinationCol;
}
export type Serverinty = "error" | "warning" | "success" | "info";
export const categoriesOptions = ["Cultural and Heritage Tourism", "Nature and Eco-tourism", "Adventure Tourism", "Gastronomy", "Recreational Tourism", "Religious and Spiritual Tourism", "Accommodation"];
export const tagsOptions = ["Adventure tourism", "Recreational tourism", "Religious and spiritual tourism", "Nature and eco-tourism", "Local activities", "Wildlife encounters", "Foodie adventure", "Hidden gems", "Luxury stays", "Short-Term Rental", "Residential accommodations"];
