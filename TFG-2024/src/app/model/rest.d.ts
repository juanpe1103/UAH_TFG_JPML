export interface LocationDto {
   id: number;
   lat: number;
   lng: number;
   description: string;
   locations: LocationsDto[];
   commentaries: CommentaryDto[];
   distance: number;
}

export interface UserDto {
    id: number;
    name: string;
    password: string;
    username: string;
    favoriteLocations: LocationDto[];
}

export interface LocationsDto {
   pos: number;
   lat: number;
   lng: number;
   description: string;
}

export interface CommentaryDto {
   id: number;
   score: number;
   description: string;
}


