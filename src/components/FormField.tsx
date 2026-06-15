type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
};

function FormField({ label, htmlFor, error, hint, required = false, children }: FormFieldProps) {
  return (
    <div className="form-field">
      <label htmlFor={htmlFor}>
        {label}{required ? <span aria-hidden="true"> *</span> : null}
      </label>
      {children}
      {error || hint ? (
        <p className={error ? "field-error" : "field-hint"} id={`${htmlFor}-help`}>
          {error || hint}
        </p>
      ) : null}
    </div>
  );
}

export default FormField;
