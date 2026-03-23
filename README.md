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
model Doctor {
  id Int @id @default(autoincrement())
  name String
  crm String @unique
  idClinic Int
  doctorProfile DoctorProfile?
  patients Patient[]
  clinic Clinic @relation(fields: [idClinic], references: [id])
}

model DoctorProfile {
  id Int @id @default(autoincrement())
  specialty String
  consultationFee Float
  idDoctor Int @unique
  doctor Doctor @relation(fields: [idDoctor], references: [id])
}

model Clinic {
  id Int @id @default(autoincrement())
  name String
  address String
  doctors Doctor[]
}

model Patient {
  id Int @id @default(autoincrement())
  name String
  cpf String @unique
  doctors Doctor[]
}
```

2. Rodar migrate
```bash
npx prisma migrate dev --name nome-da-migracao
```

3. Gerar CRUD
```bash
nest g resource doctors
nest g resource patients
nest g resource clinics
```

 Escolher:
```bash
REST API
Yes
```

4. Usar Prisma no Service
constructor(private prisma: PrismaService) {}

5. CRUD básico (exemplo)

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
