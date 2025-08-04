import { useFormikContext } from 'formik';
import { TextAreaInput, TextAreaInputProp_TP } from './TextAreaInput';
import { Label } from './Label';
import { FormikError } from './FormikError';

export const TextAreaField = ({
    label,
    name = '',
    placeholder,
    id,
    required,
    ...props
}: {
    label?: string;
    id?: string;
    name?: string;
    placeholder?: string;
} & TextAreaInputProp_TP) => {
    const {
        setFieldValue,
        setFieldTouched,
        errors,
        touched,
        values,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } = useFormikContext<{ [key: string]:any }>();

    const fieldError = errors[name];
    const isTouched = touched[name];

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <Label htmlFor={id || name} required={required}>
                    {label}
                </Label>
            )}

            <TextAreaInput
                id={id || name}
                placeholder={placeholder}
                value={props.value ?? values[name]}
                className={`text-area border ${
                    isTouched && fieldError ? '!border-mainRed border-2' : 'border-gray-200'
                }`}
                onChange={(e) => {
                    if (props.value === undefined) {
                        setFieldValue(name, e.target.value);
                    }
                }}
                onBlur={() => setFieldTouched(name, true)}
                {...props}
            />

            <FormikError name={name} />
        </div>
    );
};
