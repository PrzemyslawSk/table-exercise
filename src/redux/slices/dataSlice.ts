import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ProductsData {
  data: {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
  }[];
  page: number;
  per_page: number;
  support: {
    text: string;
    url: string;
  };
  total: number;
  total_pages: number;
}

export interface DataState {
  productsData: ProductsData | null;
  isLoading: boolean;
  error: Error | any;
}

const initialState: DataState = {
  productsData: {} as ProductsData,
  isLoading: true,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const data = fetch("https://reqres.in/api/products").then((res) => {
      if (!res.ok) {
        throw new Error(`Error code: ${res.status}`);
      } else {
        return res.json();
      }
    });
    return data;
  }
);

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.productsData = action.payload;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
      console.log(action.error);
    });
  },
});

export default dataSlice.reducer;
