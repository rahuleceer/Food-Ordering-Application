import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';

export default function Restcard({rest} ) {
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Card.Section>
            <Image
              src="../../resources/dish.jpg"
              height={160}
              alt="Norway"
            />
          </Card.Section>
    
          <Group position="apart" mt="md" mb="xs">
            <Text weight={500}>rest.Name</Text>
            <Badge color="pink" variant="light">
              rest.phone
            </Badge>
          </Group>
    
          <Text size="sm" color="dimmed">
           rest.address
          </Text>
    
          <Button variant="light" color="blue" fullWidth mt="md" radius="md">
            Add to cart
          </Button>
        </Card>
      );
}
