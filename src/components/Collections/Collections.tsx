/* eslint-disable @typescript-eslint/no-explicit-any */
import { MouseEvent } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Accordion, AccordionDetails, Box, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

import * as S from './style'

export default function Collections() {
  const handleEditCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }
  const handleDeleteCategory = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
  }

  const arr = [
    {
      name: 'Категорія 1',
      locations: [
        {
          name: 'Локація 1',
          imageFiles: [
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg'
          ],
          description:
            'Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Nature',
          petitionUrl: 'https://petition.president.gov.ua/petition/185650'
        },
        {
          name: 'Локація 2',
          imageFiles: [
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg'
          ],
          description:
            'Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Nature',
          petitionUrl: 'https://petition.president.gov.ua/petition/185650'
        }
      ]
    },
    {
      name: 'Категорія 2',
      locations: [
        {
          name: 'Локація 10',
          imageFiles: [
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922368/cld-sample-2.jpg',
            'https://res.cloudinary.com/dw5vxfdjz/image/upload/v1667922353/samples/landscapes/beach-boat.jpg'
          ],
          description:
            'Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.Phasellus et urna non diam aliquet efficitur ut tempor lacus. Nunc ut semper mi. Vivamus euismod imperdiet erat, eget vestibulum nunc sodales eu. Cras vel mattis orci. Morbi rhoncus pharetra odio nec rhoncus. Praesent venenatis, dolor ut lobortis ultricies, leo urna faucibus diam, non mollis neque urna quis quam. Donec efficitur sem nunc, quis pretium nibh elementum sit amet. Nullam orci libero, iaculis a arcu eget, aliquet fringilla velit. Fusce at augue id quam vehicula sagittis a eu neque. Nullam lacus justo, tristique vel aliquet vitae, pellentesque in eros. Vivamus in nibh sed odio accumsan convallis.',
          wikipediaUrl: 'https://en.wikipedia.org/wiki/Nature',
          petitionUrl: 'https://petition.president.gov.ua/petition/185650'
        }
      ]
    }
  ]

  return (
    <Box sx={{ padding: '20px' }}>
      <S.Title>Колекції</S.Title>
      <Box sx={{ padding: '20px' }}>
        {arr.map(category => (
          <Accordion key={category.name}>
            <S.Summary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
              <S.CategoryTitle>{category.name}</S.CategoryTitle>
              <S.Btn onClick={handleEditCategory}>
                <EditIcon sx={{ width: '16px', height: '16px', color: '#00AAFF' }} />
              </S.Btn>
              <S.Btn onClick={handleDeleteCategory}>
                <DeleteIcon sx={{ width: '16px', height: '16px', color: 'rgb(211, 47, 47)' }} />
              </S.Btn>
            </S.Summary>
            <AccordionDetails>
              {category.locations.map(location => (
                <S.LocationContainer key={location.name}>
                  <S.ImagesContainer>
                    {location.imageFiles.map((img, index) => (
                      <S.ImgContainer key={index}>
                        <S.Img src={img} alt='Img' loading='lazy' />
                      </S.ImgContainer>
                    ))}
                    <S.NameContainer>
                      <S.Name>{location.name}</S.Name>
                    </S.NameContainer>
                  </S.ImagesContainer>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography fontSize={24} fontWeight={500}>
                      Опис
                    </Typography>
                    <Typography>{location.description}</Typography>
                  </Box>
                </S.LocationContainer>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  )
}

Collections.displayName = 'Collections'

export { Collections }
