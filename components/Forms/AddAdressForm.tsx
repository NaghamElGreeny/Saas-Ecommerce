import { useRef, useState } from "react";
// import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addAddress } from "@/services/ClientApiHandler";
import toast from "react-hot-toast";
// import GoogleMapComponent from "../shared/GoogleMap";
import GoogleMapSelector from "../shared/GoogleMap";
// import { useGoogleMapsLoader } from "@/utils/useGoogleMapsLoader";

// const containerStyle = { width: "100%", height: "200px" };
// const defaultCenter = { lat: 31.022782, lng: 31.386789 };

const validationSchema = Yup.object({
  address: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  title: Yup.string().min(3, "Minimum 3 characters").required("Required"),
  building: Yup.number().required("Required"),
  floorNo: Yup.number().required("Required"),
  apartment: Yup.number().required("Required"),
});

const AddressForm = ({ isUpdate = false }: { isUpdate?: boolean }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const searchInputRef = useRef<HTMLInputElement>(null);
  // const mapRef = useRef<GoogleMap>(null);
  // const [map, setMap] = useState<google.maps.Map | null>(null);

  // const { isLoaded } = useGoogleMapsLoader();

  return (
    <div className="h-full w-full space-y-6 overflow-y-auto rounded-3xl bg-white p-6">
      <h2 className="mb-4 text-xl font-semibold">Add New Address</h2>

      <Formik
        initialValues={{
          isDefault: false,
          address: "",
          title: "",
          building: "",
          floorNo: "",
          apartment: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          if (!location) {
            toast.error("Please select a location on the map");
            return;
          }

          const payload = {
            title: values.title,
            lat: location.lat,
            lng: location.lng,
            desc: values.address,
            is_default: values.isDefault,
            building: values.building,
            floor: values.floorNo,
            apartment: values.apartment,
          };
          if (values.isDefault == false) {
            delete payload.is_default;
          }
          try {
            if (isUpdate) {

             } else { 
              await addAddress(payload);
              toast.success("Address saved successfully!");
              resetForm();
              setLocation(null);
            }
          } catch (error) {
            toast.error("Failed to save address");
            console.error(error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="flex items-center gap-2">
              <Field type="checkbox" name="isDefault" className="!size-5" />
              <label htmlFor="isDefault">Default Address</label>
            </div>

            <div>
              <label className="mb-1 block font-medium">Address</label>
              <Field
                innerRef={searchInputRef}
                name="address"
                placeholder="Search or click on map"
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="address"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="overflow-hidden rounded">
             
              <GoogleMapSelector
                onLocationSelect={(coords) => {
                  setLocation(coords);
              
                }}
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Title</label>
              <Field
                name="title"
                placeholder="E.g. My Place"
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <label className="mb-1 block font-medium">Building</label>
              <Field
                name="building"
                type="number"
                className="w-full rounded border p-2"
              />
              <ErrorMessage
                name="building"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-medium">Floor</label>
                <Field
                  name="floorNo"
                  type="number"
                  className="w-full rounded border p-2"
                />
                <ErrorMessage
                  name="floorNo"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div>
                <label className="mb-1 block font-medium">Apartment</label>
                <Field
                  name="apartment"
                  type="number"
                  className="w-full rounded border p-2"
                />
                <ErrorMessage
                  name="apartment"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary hover:text-primary hover:border-primary w-full rounded-full py-3 text-white hover:border-2 hover:bg-white"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddressForm;
