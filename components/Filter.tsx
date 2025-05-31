'use client';

import { useFormik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

type Category = {
  id: string;
  name: string;
  subCategories?: SubCategory[];
};

type SubCategory = {
  id: string;
  name: string;
};

type FilterValues = {
  search: string;
  mainCategory: string;
  subCategory: string;
};

type FilterFormProps = {
  categories: Category[];
};

// Validation schema with Yup
const FilterSchema = Yup.object().shape({
  mainCategory: Yup.string().required('Please select a category'),
  subCategory: Yup.string().when('mainCategory', (mainCategory, schema) => {
    return !!mainCategory
      ? schema.notRequired()
      : schema.notRequired(); 
  }),
});


export default function FilterForm({ categories }: FilterFormProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const formik = useFormik<FilterValues>({
    initialValues: {
      search: '',
      mainCategory: '',
      subCategory: '',
    },
    validationSchema: FilterSchema,
    onSubmit: (values) => {
      const newFilters = [];
      const mainCat = categories.find(c => c.id === values.mainCategory);
      
      if (mainCat) {
        newFilters.push(mainCat.name);
        
        if (values.subCategory) {
          const subCat = mainCat.subCategories?.find(s => s.id === values.subCategory);
          if (subCat) newFilters.push(subCat.name);
        }
      }
      
      setActiveFilters(newFilters);
    },
  });

  const removeFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter(f => f !== filter));
    
    // If removing a main category, reset both fields
    if (categories.some(c => c.name === filter)) {
      formik.setFieldValue('mainCategory', '');
      formik.setFieldValue('subCategory', '');
    }
  };

  const selectedCategory = categories.find(c => c.id === formik.values.mainCategory);
  const subCategories = selectedCategory?.subCategories || [];

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow-sm">
      {/* Active Filters Display */}
      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">Active filters</h3>
        <div className="flex flex-wrap gap-2">
          {activeFilters.map(filter => (
            <div key={filter} className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm">
              <span>{filter}</span>
              <button
                type="button"
                onClick={() => removeFilter(filter)}
                className="ml-1 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
          {activeFilters.length === 0 && (
            <p className="text-sm text-gray-500">No filters active</p>
          )}
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        {/* Search Field */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...formik.getFieldProps('search')}
          />
        </div>

        {/* Popular Filters */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Popular</h3>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
              onClick={() => {
                const foodCategory = categories.find(c => c.name === 'Food');
                if (foodCategory) {
                  formik.setFieldValue('mainCategory', foodCategory.id);
                  formik.setFieldValue('subCategory', '');
                }
              }}
            >
              <span>Food</span>
              <span className="ml-1 text-gray-500">×</span>
            </button>
            <button
              type="button"
              className="flex items-center bg-gray-100 rounded-full px-3 py-1 text-sm"
              onClick={() => {
                const burger = categories
                  .flatMap(c => c.subCategories || [])
                  .find(s => s.name === 'Burger');
                if (burger) {
                  const parentCat = categories.find(c => 
                    c.subCategories?.some(s => s.id === burger.id)
                  );
                  if (parentCat) {
                    formik.setFieldValue('mainCategory', parentCat.id);
                    formik.setFieldValue('subCategory', burger.id);
                  }
                }
              }}
            >
              <span>Burger</span>
              <span className="ml-1 text-gray-500">×</span>
            </button>
          </div>
        </div>

        {/* Main Categories */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Select main category</h3>
          {formik.touched.mainCategory && formik.errors.mainCategory ? (
            <div className="text-red-500 text-xs mb-2">{formik.errors.mainCategory}</div>
          ) : null}
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                type="button"
                className={`px-4 py-2 rounded-md text-sm ${
                  formik.values.mainCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
                onClick={() => {
                  formik.setFieldValue('mainCategory', category.id);
                  formik.setFieldValue('subCategory', '');
                }}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Sub Categories */}
        {formik.values.mainCategory && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Select sub category</h3>
            <div className="grid grid-cols-2 gap-2">
              {subCategories.map(subCategory => (
                <button
                  key={subCategory.id}
                  type="button"
                  className={`px-4 py-2 rounded-md text-sm ${
                    formik.values.subCategory === subCategory.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => {
                    formik.setFieldValue('subCategory', subCategory.id);
                  }}
                >
                  {subCategory.name}
                </button>
              ))}
              {subCategories.length > 6 && (
                <button 
                  type="button"
                  className="px-4 py-2 rounded-md text-sm bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  + {subCategories.length - 6} more
                </button>
              )}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          disabled={!formik.values.mainCategory}
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
}