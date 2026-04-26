export interface Testimonial {
  id: string;
  tenant_id: string;
  message: string;
  image_url: string | null;
  full_name: string;
  star_rating: number;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Stat {
  id: string;
  tenant_id: string;
  label: string;
  value: string;
  description: string | null;
  icon_name: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      testimonials: {
        Row: Testimonial;
        Insert: {
          id?: string;
          tenant_id: string;
          message: string;
          image_url?: string | null;
          full_name: string;
          star_rating: number;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>;
      };
       stats: {
        Row: Stat;
        Insert: {
          id?: string;
          tenant_id: string;
          label: string;
          value: string;
          description?: string | null;
          icon_name?: string | null;
          is_active?: boolean;
          display_order?: number;
          created_at?: string;
          updated_at?: string;
        };
         };
        Update: Partial<Database['public']['Tables']['stats']['Insert']>;
    };


  };
}