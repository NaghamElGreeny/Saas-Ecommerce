// import { Button } from "@mantine/core";
// import { Form, Formik } from "formik";
// import { useTranslation } from "react-i18next";
// import { BiReset } from "react-icons/bi";
// import DateInput from "../../../components/atoms/DateInput";
// import GeneralStaticSelect from "../../../components/molecules/selects/GeneralStaticSelect";
// import GeneralSelect from "../../molecules/selects/GeneralSelect";
// import { BaseInputField } from "../BaseInputField";

// interface FilterSectionProps {
//   initialValues: any;
//   optionsList?: any[];
//   onSubmit: (values: any) => void;
//   onReset: (
//     resetForm: () => void,
//     setFieldValue: (field: string, value: any) => void,
//   ) => void;
//   isLoading: boolean;
//   keywords?: string[]; // Array to support multiple keywords
//   selectKeys?: string[]; // Array to support multiple select keys
//   apiName?: string;
//   isGeneralApi?: boolean;
//   dateLabel?: string;
//   startDateName?: string;
//   endDateName?: string;
// }

// interface Option {
//   id: number;
//   value: string;
//   label: string;
// }

// export default function FilterSection({
//   initialValues,
//   optionsList,
//   onSubmit,
//   onReset,
//   isLoading,
//   keywords = [],
//   selectKeys = [],
//   dateLabel,
//   startDateName,
//   endDateName,
//   isGeneralApi = false,
//   apiName,
// }: FilterSectionProps) {
//   const { t } = useTranslation();

//   return (
//     <Formik initialValues={initialValues} onSubmit={onSubmit}>
//       {({ values, resetForm, setFieldValue }) => (
//         <Form>
//           <div className="mb-10 grid grid-cols-12 items-end justify-between">
//             <div className="col-span-12 lg:col-span-10">
//               <div className="grid grid-cols-12 gap-5">
//                 {/* Render keyword inputs dynamically */}
//                 {keywords.map((keyword) => (
//                   <div className="col-span-12 md:col-span-4" key={keyword}>
//                     <BaseInputField
//                       label={t(`labels.${keyword}`)}
//                       name={keyword}
//                       id={keyword}
//                       type="text"
//                       className="border"
//                       placeholder={t("enter") + " " + t(`labels.${keyword}`)}
//                     />
//                   </div>
//                 ))}

//                 {/* Render select key inputs dynamically */}
//                 {selectKeys.map((selectKey) => (
//                   <div className="col-span-12 md:col-span-4" key={selectKey}>
//                     {apiName ? (
//                       <GeneralSelect
//                         isClear={false}
//                         isGeneral={isGeneralApi}
//                         name={selectKey}
//                         apiName={apiName} // Pass apiName to GeneralSelect
//                         label={t(`labels.${selectKey}`)}
//                         placeholder={
//                           t("select") + " " + t(`labels.${selectKey}`)
//                         }
//                         onChange={(option: Option | null) =>
//                           setFieldValue(selectKey, option)
//                         }
//                       />
//                     ) : (
//                       <GeneralStaticSelect
//                         isClear={false}
//                         name={selectKey}
//                         dataOptions={optionsList || []}
//                         label={t(`labels.${selectKey}`)}
//                         placeholder={
//                           t("select") + " " + t(`labels.${selectKey}`)
//                         }
//                         value={
//                           optionsList?.find(
//                             (option) => option.value === values[selectKey],
//                           ) || null
//                         }
//                         onChange={(option: Option | null) =>
//                           setFieldValue(selectKey, option?.value)
//                         }
//                       />
//                     )}
//                   </div>
//                 ))}

//                 {startDateName && (
//                   <div className="col-span-12 md:col-span-4">
//                     <DateInput
//                       label={
//                         dateLabel
//                           ? t(`labels.${dateLabel}`)
//                           : t("labels.start_date")
//                       }
//                       placeholder={t("enter") + " " + t("labels.date")}
//                       name={startDateName}
//                       defaultValue={values[startDateName]}
//                     />
//                   </div>
//                 )}
//                 {endDateName && (
//                   <div className="col-span-12 md:col-span-4">
//                     <DateInput
//                       minDateValue={
//                         startDateName ? values[startDateName] : undefined
//                       }
//                       label={t("labels.end_date")}
//                       placeholder={t("enter") + " " + t("labels.date")}
//                       name={endDateName}
//                       defaultValue={values[endDateName]}
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//             <div className="col-span-12 mt-auto flex justify-end lg:col-span-2">
//               <div className="flex flex-wrap gap-2">
//                 <Button
//                   type="submit"
//                   className="bg-primary hover:text-text-website-font hover:border-primary rounded-lg border text-white hover:bg-white"
//                   loading={isLoading}
//                 >
//                   {t("buttons.search")}
//                 </Button>

//                 <Button
//                   type="button"
//                   className="border-primary text-text-website-font dark:text-white-dark dark:border-white-dark rounded-lg border bg-transparent text-xl hover:bg-transparent"
//                   onClick={() => onReset(resetForm, setFieldValue)}
//                 >
//                   <BiReset />
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// }
