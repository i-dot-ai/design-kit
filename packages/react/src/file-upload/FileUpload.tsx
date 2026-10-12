import type { ComponentPropsWithoutRef } from 'react';

type FileUploadProps = ComponentPropsWithoutRef<'input'> & {
    class?: string;
};

export default function FileUpload({ class: className, ...rest }: FileUploadProps) {
    const classes = ["govuk-file-upload", className ?? ""].filter(Boolean).join(" ");

    return (
        <input className={classes} type="file" {...rest} />
    );
}
