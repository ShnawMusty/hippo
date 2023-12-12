import { Access, CollectionConfig } from "payload/types";

const yourOwn: Access = ({req}) => {
  if (req.user.role === 'admin') return true;
  return {
    user: {
      equals: req.user?.id
    }
  }
}

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'Your orders',
    description: 'A summary of all your orders on DigitalHippo'
  },
  access: {
    create: yourOwn,
    read: ({req}) => req.user.role === 'admin', 
    update: ({req}) => req.user.role === 'admin', 
    delete: ({req}) => req.user.role === 'admin', 

  },
  fields: [
    {
      name: '_isPaid',
      type: 'checkbox',
      access: {
        read: ({req}) => req.user.role === 'admin',
        create: () => false,
        update: () => false
      },
      admin: {
        hidden: true
      },
      required: true
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        hidden: true
      },
      required: true,
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true
    },
  ]
}