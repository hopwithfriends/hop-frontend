import type React from 'react';
import { useState, type ChangeEvent } from 'react'
import Image from 'next/image';

const ProfilePicUploader: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-2xl font-bold">Profile Picture</h2>
      <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt="Profile"
            width={160}
            height={160}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-500">
            No image
          </div>
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
        id="profilePicUpload"
      />
      <label
        htmlFor="profilePicUpload"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 transition-colors"
      >
        Select Image
      </label>
    </div>
  );
};

export default ProfilePicUploader;