# WORKSPACE CRUD - NEST + PRISMA + SQLITE

Guia rápido para usar este projeto na prova.

---

## 1. CLONAR O PROJETO

```bash
git clone https://github.com/eduardo-gms/crud-workspace.git
cd crud-workspace
```
## 2. INSTALAR DEPENDÊNCIAS
```bash
npm install
```
## 3. CONFIGURAR BANCO (PRISMA)
```bash
npx prisma migrate dev
```

 Isso vai:

criar o banco SQLite (dev.db)
gerar o Prisma Client

## 4. RODAR O PROJETO
```bash
npm run start:dev
```

Acesse: http://localhost:3000/api

## 5. (PASSO A PASSO)
1. Criar entidades no Prisma

Editar:
```bash
prisma/schema.prisma
```
Exemplo:
```bash
model Author {
  id    Int    @id @default(autoincrement())
  name  String
  posts Post[]
}

model Post {
  id       Int    @id @default(autoincrement())
  title    String
  content  String

  authorId Int
  author   Author @relation(fields: [authorId], references: [id])
}
```

2. Rodar migrate
```bash
npx prisma migrate dev --name nome-da-migracao
```

3. Gerar CRUD
```bash
nest g resource authors
nest g resource posts
```

 Escolher:
```bash
REST API
Yes
```

4. Conectar Prisma nos módulos

Em authors.module.ts e posts.module.ts:

imports: [PrismaModule]

5. Usar Prisma no Service
constructor(private prisma: PrismaService) {}

6. CRUD básico (exemplo)

CREATE
```bash
create(createDto: any) {
  return this.prisma.post.create({
    data: {
      title: createDto.title,
      content: createDto.content,
      author: {
        connect: { id: createDto.authorId },
      },
    },
  });
}
```
READ
```bash
findAll() {
  return this.prisma.post.findMany({
    include: { author: true },
  });
}
```
UPDATE
```bash
update(id: number, data: any) {
  return this.prisma.post.update({
    where: { id },
    data,
  });
}
```
DELETE
```bash
remove(id: number) {
  return this.prisma.post.delete({
    where: { id },
  });
}
```
 8. ERROS COMUNS (E SOLUÇÕES)
 PrismaService não encontrado

✔ Importar PrismaModule no módulo

 "data não existe"

✔ Usar DTO corretamente:

create(createDto: CreateDto)
 ValidationPipe não encontrado

 Importar:

import { ValidationPipe } from '@nestjs/common';
 Swagger não encontrado

✔ Instalar:

npm install @nestjs/swagger
 Relacionamento não funciona

✔ Usar:

connect: { id: ... }
