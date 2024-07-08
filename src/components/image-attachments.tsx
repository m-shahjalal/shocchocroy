'use client';

import { useEffect, useMemo, useState } from 'react';
import Compressor from '@uppy/compressor';
import Uppy, { SuccessResponse } from '@uppy/core';
import ImageEditor from '@uppy/image-editor';
import { DashboardModal } from '@uppy/react';
import xhr from '@uppy/xhr-upload';

import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import '@uppy/image-editor/dist/style.css';

import Image from 'next/image';
import { cn } from '@/utils/cn';
import { ProductSchemaType } from '@/validator/product-form-schema';
import { UppyFile } from '@uppy/core';
import { Upload } from 'lucide-react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import { Button } from './ui/button';
import { Card, CardTitle } from './ui/card';

const Uploader = ({ maximum }: { maximum: number }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<ProductSchemaType>();
  const { append } = useFieldArray({ control, name: 'imageLinks' as never });

  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<
    UppyFile<Record<string, unknown>, Record<string, unknown>>[]
  >([]);

  const uppy = useMemo(() => {
    const handlePathNames = (_file: any, response: SuccessResponse) => {
      const path = response.body.result?.data?.path;
      if (path) append(path);
    };

    return new Uppy({
      id: 'uppy',
      allowMultipleUploadBatches: true,
      restrictions: {
        maxFileSize: 15 * 1024 * 1024,
        maxNumberOfFiles: maximum,
        allowedFileTypes: ['.jpg', '.jpeg', 'gif', '.png'],
      },
    })
      .use(ImageEditor, {
        id: 'ImageEditor',
        quality: 0.8,
        cropperOptions: {
          viewMode: 1,
          background: false,
          autoCropArea: 1,
          wheelZoomRatio: -1,
          croppedCanvasOptions: {},
        },
      })
      .use(Compressor)
      .use(xhr, { endpoint: `${process.env.NEXT_PUBLIC_SITE_URL!}/api/upload` })
      .on('upload-success', handlePathNames)
      .on('file-added', () => setImages(uppy.getFiles()))
      .on('file-removed', () => setImages(uppy.getFiles()));
  }, [append, maximum]);

  useEffect(() => {
    if (uppy.getFiles().length === 0) setImages([]);
  }, [uppy]);

  return (
    <>
      <Card className="p-5">
        <CardTitle>Images</CardTitle>

        {images.length ? (
          <div className="flex flex-wrap items-center justify-center gap-4 pt-5">
            {images.map((file, index) => (
              <Image
                key={index}
                className="h-48 w-64 cursor-pointer overflow-hidden rounded-md border border-gray-400 object-cover p-2 transition-all hover:opacity-60"
                src={URL.createObjectURL(file.data)}
                alt={file.name}
                width="400"
                height="400"
                onClick={() => setIsOpen(true)}
              />
            ))}
            {images.length < 6 && (
              <Button
                onClick={() => setIsOpen(true)}
                type="button"
                className="flex h-48 w-64 flex-col items-center justify-center gap-2 overflow-hidden rounded-md border border-dashed border-gray-400 object-cover p-2 text-gray-600"
                variant="ghost"
              >
                <Upload className="block" />
                <small>Add Another Image</small>
              </Button>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 py-10">
            <small className={cn(errors.imageLinks?.message && 'text-red-500')}>
              No image selected, please select images{' '}
              <span className="text-red-500">*</span>
            </small>
            <Button onClick={() => setIsOpen(true)} type="button">
              Add attachments
            </Button>
          </div>
        )}
      </Card>
      <DashboardModal
        open={isOpen}
        uppy={uppy}
        plugins={['ImageEditor']}
        onRequestClose={() => setIsOpen(false)}
        closeModalOnClickOutside
        metaFields={[{ id: 'name', name: 'Name', placeholder: 'File name' }]}
        proudlyDisplayPoweredByUppy={false}
        note="this is a test note"
        title="Upload product images here"
      />
    </>
  );
};

export default Uploader;
