# WORKSPACE CRUD - NEST + PRISMA + SQLITE

Guia rápido para usar este projeto na prova.

---

## (PASSO A PASSO)
1. CLONAR O PROJETO

```bash
git clone https://github.com/eduardo-gms/crud-workspace.git
cd crud-workspace
```

2. INSTALAR DEPENDÊNCIAS
```bash
npm install
```

3. Criar entidades no Prisma

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

4. Rodar migrate
```bash
npx prisma migrate dev --name nome-da-migracao
```

5. Gerar CRUD
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

6. Usar Prisma no Service
```bash
import { PrismaService } from '../prisma/prisma.service';
constructor(private prisma: PrismaService) {}
```
6. AJUSTAR OS DTOs (Data Transfer Objects)

Após gerar o recurso no passo anterior, os arquivos dentro da pasta `dto` estarão vazios. É **obrigatório** definir quais dados a sua API vai receber do usuário, baseando-se no que foi definido no `schema.prisma`.

Exemplo com a entidade Clinic:

Editar arquivo: `src/clinics/dto/create-clinic.dto.ts`
```
export class CreateClinicDto {
  name: string;
  address: string;
}
```
Editar arquivo: `src/clinics/dto/update-clinic.dto.ts`
```
import { PartialType } from '@nestjs/mapped-types';
import { CreateClinicDto } from './create-clinic.dto';

// O PartialType já transforma name e address em atributos opcionais
export class UpdateClinicDto extends PartialType(CreateClinicDto) {}
```

7. CRUD básico (exemplo)
Abra o arquivo `src/clinics/clinics.service.ts` e adapte os métodos:

CREATE
```
CREATE (Criar Clínica)**
```typescript
create(createClinicDto: any) {
  return this.prisma.clinic.create({
    data: {
      name: createClinicDto.name,
      address: createClinicDto.address,
    },
  });
}
```
READ
```
findAll() {
  return this.prisma.clinic.findMany({
    // O 'include' faz o JOIN com a tabela de médicos
    include: { 
      doctors: true 
    },
  });
}
findOne(id: number) {
  return this.prisma.clinic.findUnique({
    where: { id },
    include: { doctors: true },
  });
}
```
UPDATE
```
update(id: number, updateClinicDto: any) {
  return this.prisma.clinic.update({
    where: { id },
    data: {
      name: updateClinicDto.name,
      address: updateClinicDto.address,
    },
  });
}
```
DELETE
```
remove(id: number) {
  return this.prisma.clinic.delete({
    where: { id },
  });
}
```
8. RODAR O PROJETO
```
npm run start:dev
```

Acesse: http://localhost:3000/api
