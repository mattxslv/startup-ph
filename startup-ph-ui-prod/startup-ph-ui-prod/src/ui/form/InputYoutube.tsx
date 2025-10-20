import clsx from 'clsx'
import React from 'react'
import { useFormContext } from './hooks'
import InputShell from './InputShell'

interface Props extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  urlName: string
  thumbnailName: string
  label?: string
  note?: string
  trailing?: React.ReactNode
}

const extractYTid = (url: string) => {
  try {
    const regex = /v=([a-zA-Z0-9_-]+)/;
    const embedUrlRegex = /\/embed\/([A-Za-z0-9_-]{11})/;
    const match = url.match(regex);
    const embedMatch = url.match(embedUrlRegex);
    if (url.includes('embed')) return embedMatch?.[1];
    return match?.[1];
  } catch (err) {
    return null;
  }
};

export const formatYtToEmbedd = (url: string) => {
  try {
    const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+$/;
    if (regex.test(url || '')) {
      const code = extractYTid(url);
      return `https://www.youtube.com/embed/${code}`;
    }
    return url;
  } catch (err) {
    return url;
  }
};

const formatYtToThumbnail = (url: string) => {
  try {
    const regex = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+$/;
    if (regex.test(url || '')) {
      const code = extractYTid(url);
      return `https://i.ytimg.com/vi/${code}/sddefault.jpg`;
    }
    return url;
  } catch (err) {
    return url;
  }
};


function InputYoutube({
  urlName,
  thumbnailName,
  label,
  required,
  note,
  trailing,
  className,
  ...rest
}: Props) {
  const { values, setFieldValue, errors } = useFormContext()
  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const embeddUrl = formatYtToEmbedd(target.value);
    const thumbnailUrl = formatYtToThumbnail(target.value);
    setFieldValue(urlName, embeddUrl);
    setFieldValue(thumbnailName, thumbnailUrl);
  }
  const error = errors?.[urlName] as string
  return (
    <InputShell label={label} note={error ?? note} optional={!required} error={error} trailing={trailing}>
      <input
        className={clsx(
          'form-input w-full h-10 rounded',
          'text-sm leading-4',
          'placeholder:text-muted focus:ring-outline-active focus:ring-2 focus:border-transparent',
          'disabled:bg-fill-disabled disabled:text-disabled',
          error ? 'text-danger bg-danger-light border-danger' : 'border-outline focus:bg-primary-light focus:border-primary-base',
          className
        )}
        type="text"
        title={label}
        required={required}
        onChange={handleChange}
        value={values[urlName] ?? ''}
        {...rest}
      />
    </InputShell>
  )
}

export default InputYoutube
