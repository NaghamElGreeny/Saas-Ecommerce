'use client'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import Image from 'next/image';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
});

const ContactForm = () => {
  const validationSchema = Yup.object().shape({
    full_name: Yup.string().required('Full Name is required'),
    phone: Yup.string()
      .required('Phone is required')
      .matches(/^[0-9]+$/, 'Phone must be only numbers'),
    message_type: Yup.string().required('Type of message is required'),
    message: Yup.string().required('Message is required'),
  });

  const formik = useFormik({
    initialValues: {
      full_name: '',
      phone: '',
      message_type: '',
      message: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const confirmed = confirm('Are you sure you want to send the message?');
      if (!confirmed) return;

      console.log('Form submitted:', values);
      // Handle API call here
    },
  });

  const messageTypes = [
    { value: '', label: 'Choose Type Of Message' },
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Support Request' },
    { value: 'feedback', label: 'Feedback' },
    { value: 'other', label: 'Other' },
  ];

  return (
    <div className="container mt-10 rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="p-8 space-y-6">
          <h2 className="text-4xl font-bold">Contact Us</h2>
          <p className="text-gray-500">Contact us through the following steps</p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="full_name"
                placeholder="Full Name"
                className={`w-full p-3 rounded-md border ${formik.touched.full_name && formik.errors.full_name ? 'border-red-500' : 'border-gray-300'}`}
                {...formik.getFieldProps('full_name')}
              />
              {formik.touched.full_name && formik.errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.full_name}</p>
              )}
            </div>

            <div className="flex gap-2 items-center">
              <Image src="https://flagcdn.com/w20/eg.png" alt="EG" width={20} height={16} />
              <span>+20</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className={`flex-1 p-3 rounded-md border ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                {...formik.getFieldProps('phone')}
              />
            </div>
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}

            <div>
              <select
                name="message_type"
                className={`w-full p-3 rounded-md border ${formik.touched.message_type && formik.errors.message_type ? 'border-red-500' : 'border-gray-300'}`}
                {...formik.getFieldProps('message_type')}
              >
                {messageTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {formik.touched.message_type && formik.errors.message_type && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message_type}</p>
              )}
            </div>

            <div>
              <textarea
                name="message"
                rows={6}
                placeholder="Enter your message here"
                className={`w-full p-3 rounded-md border resize-none ${formik.touched.message && formik.errors.message ? 'border-red-500' : 'border-gray-300'}`}
                {...formik.getFieldProps('message')}
              />
              {formik.touched.message && formik.errors.message && (
                <p className="text-red-500 text-sm mt-1">{formik.errors.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md mt-5"
            >
              Send Message <FaArrowRight />
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="relative">
          {/* Call Center Button */}
{/* Call Center Floating Button */}
<div className="absolute -top-6 right-6 z-50 group">
  <div className="relative flex items-center space-x-2">
    {/* Call info on hover */}
    <div className="hidden group-hover:flex flex-col bg-white shadow-lg rounded-lg p-3 transition-opacity duration-300 absolute -left-[220px] top-1/2 -translate-y-1/2 w-[200px]">
      <p className="text-sm font-semibold text-gray-700 mb-1">Call Center</p>
      <a href="tel:201000020000" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
        <Image
          src="https://flagcdn.com/w24/eg.png"
          alt="Egypt flag"
          width={24}
          height={18}
          className="rounded-sm"
        />
        (20) 1000020000
      </a>
    </div>

    {/* Phone icon button */}
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 shadow-lg hover:scale-110 transition-transform duration-300">
      <FaPhone className="text-white text-xl" />
    </div>
  </div>
</div>

          {/* Map */}
          <div className="h-[350px] lg:h-[725px] rounded-md overflow-hidden">
            <MapContainer center={[31.0362, 31.5556]} zoom={14} style={{ height: '100%', width: '100%' }}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[31.0362, 31.5556]}>
                <Popup>Our Location</Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
