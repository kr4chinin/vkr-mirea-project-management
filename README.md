# Project Management Application

**MVP** для **ВКР** _"Разработка прототипа ИС поддержки контроля выполнения задач ИТ-проектов на примере типового агентства по разработке веб-приложений"_ – МИРЭА - Российский технологический университет.

> [!WARNING]  
> Регистрация в системе доступа только по **whitelist**!

> [!WARNING]  
> 2 Августа 2024 года закончится бесплатный период хостинга БД и приложение можно будет запустить только локально. Регистрация доступа только по **whitelist**!.

## Содержание

1. [Project Management Application](#project-management-application)
2. [Введение](#введение)
   - [Технологический стек](#технологический-стек)
3. [База данных](#база-данных)
   - [Логическая модель (в нотации Crow's Foot)](#логическая-модель-в-нотации-crows-foot)
   - [Физическая модель](#физическая-модель)
4. [Дерево функций и сценарий диалога](#дерево-функций-и-сценарий-диалога)
5. [Бизнес-процессы (типового агентства по разработке веб-приложений) – AS-IS и TO-BE](#бизнес-процессы-типового-агентства-по-разработке-веб-приложений--as-is-и-to-be)
6. [Пользовательский интерфейс](#пользовательский-интерфейс)
7. [Заключение](#заключение)

## Введение

Прототип **fullstack web-приложения** для управления проектами и проектными задачами.

### Технологический стек

- TypeScript
- [Next.js](https://github.com/vercel/next.js) (with app directory)
- [PostgreSQL](https://www.postgresql.org/) + [Prisma](https://github.com/prisma/prisma)
- [trpc](https://github.com/trpc/trpc)
- [tailwind-css](https://github.com/tailwindlabs/tailwindcss)
- [shadcn-ui](https://github.com/shadcn-ui/ui)
- [clerk](https://github.com/clerk) (authentication provider)

Приложение было развернуто с использованием [create-t3-app](https://github.com/t3-oss/create-t3-app).

### База данных

> [!NOTE]  
> **TO-BE** – модель, к которой планируется прийти в конце разработки. **AS-IS** – модель, которая была реализована в рамках **MVP**.

#### Логическая модель (в нотации Crow's Foot)

- TO-BE:
<img width="600" alt="Логическая модель Crow's Foot TO-BE – drawio" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/acbbff20-db06-46f6-8b9f-522ad9b8eac6">

#### Физическая модель

Визуализация Prizma-схемы выполнена при помощи веб-приложения [prizmalizer](https://prismaliser.app/).

- TO-BE:
<img width="600" alt="Физическая модель TO-BE – Prizmalizer" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/fffa7806-a7ce-42d7-806b-ea441c4cf2d5">

- AS-IS:
<img width="600" alt="Физическая модель AS-IS – Prizmalizer" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/ff91a50b-48fd-483b-8dd2-4e51a0801051">

### Дерево функций и сценарий диалога

> [!NOTE]  
> **Дерево функций** – это модель, которая описывает иерархическую структуру функций бизнес-процессов организации. Вершины этого дерева представляют основные цели предприятия, а ветви обозначают функции системы, необходимые для достижения этих целей. Каждая функция может быть детализирована с использованием подфункций.

<img width="600" alt="Дерево функций" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/1a14fed6-9d92-456d-9bc9-06b46ee53623">

Сценарий диалога (частично **TO-BE**) представлен для пользователей, с ролями:

```prisma
enum UserRole {
  OWNER
  ADMIN
  USER
}
```

<img width="600" alt="Сценарий Авторизация" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/f2793a25-536e-4e47-8961-7e4b9b42cec5">
<img width="600" alt="Сценарий ADMIN и OWNER" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/4b159597-5e72-4be5-9fe7-77aca692a14c">
<img width="600" alt="Сценарий USER" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/ae9837cf-59c1-48db-ad35-a63cc12849a5">

### Бизнес-процессы (типового агентства по разработке веб-приложений) – AS-IS и TO-BE

Для анализа существующей технологии выполнения необходимо построить модель **AS-IS**. Данная модель помогает не только систематизировать протекающие в данный момент процессы и используемые информационные объекты, но и выявить недостатки и проблемы бизнес-процесса и ликвидировать их в разрабатываемом прототипе информационной системе.

Бизнес-процесс поддержки контроля выполнения задач ИТ-проектов на примере типового агентства по разработке веб-приложений начинается со старта проекта и заканчивается его завершением.

Все модели построены в нотации [BPMN 2.0.2](https://www.omg.org/spec/BPMN/2.0.2/About-BPMN).

- AS-IS:

<img width="600" alt="AS-IS" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/f5f4cfa5-5da1-4780-a029-4772cd59834d">

При построении модели бизнес-процесса **AS-IS** поддержки контроля выполнения задач ИТ-проектов на примере типового агентства по разработке веб-приложений были выявлены следующие недостатки:

- неэффективное управление задачами;
- недостаточная прозрачность и коммуникация;
- сложности в планировании и контроле сроков.

Для устранения недостатков существующей технологии выполнения процесса были определены пути их устранения и смоделирована модель бизнес-процесса **TO-BE**.
Модель TO-BE описывает будущее состояние бизнес-процесса с учетом функциональных требований, а также анализа и оптимизации существующих процессов.

- TO-BE:

<img width="600" alt="TO-BE 1" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/05feda6f-ef28-47ab-9442-a1ab15526916">
<img width="600" alt="TO-BE 2" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/bd11c72d-b19d-4f52-b9ec-d6c790951add">
<img width="600" alt="TO-BE 3" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/0a891c1b-93fa-4c8c-8f1c-cec4cfd9c8f5">

## Пользовательский интерфейс

1. Авторизация и регистрация с использование Clerk-провайдера:
   <img width="600" alt="Авторизация" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/ef0180f3-6d3c-42e5-9e25-ece2af327209">
   <img width="600" alt="Регистрация" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/3ab2b339-1b20-425b-888d-fc79febe30fc">

2. Страница проекта, проектных задач и мониторинга проекта:
   <img width="800" alt="Страница проекта" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/0ee6d5e9-1342-4808-b7e6-f9922fef87fb">
   <img width="800" alt="Страница проектных задач" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/fb5fd1d0-4aee-4872-8620-18e121eab1c1">
   <img width="800" alt="Страница мониторинга проекта" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/827d8a35-8580-4b1c-9e85-4483eef0e006">

3. Страница проектной аналитики (по всем пользователям, проектам и задачам в системе):
   <img width="800" alt="Страница проектной аналитики" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/f8c9f5d3-33d9-4e33-9ad0-f47d95cc8df2">

4. Профиль пользователя (с использованием Clerk-провайдера):
   <img width="600" alt="Профиль" src="https://github.com/kr4chinin/vkr-mirea-project-management/assets/103210607/a65cace4-3542-414d-b569-cc39e898687f">

## Заключение

_Ниже представлена часть заключение из **ВКР**._

В результате работы над ВКР выявлены ключевые аспекты предметной области, включая организацию и функциональные отделы типовых агентств по разработке веб-приложений. Описана внешняя среда, охватывающая экономическую область и сферу веб-разработки.

Была выделена актуальность темы в контексте растущего интереса к онлайн-платформам. Поставлена задача на разработку информационной системы, направленной на оптимизацию бизнес-процессов агентств касательно поддержки контроля выполнения задач ИТ-проектов.

Анализ существующей технологии выявил некоторые ограничения, которые требуют усовершенствования. В контексте разработки ИС, можно улучшить эффективность и безопасность веб-приложений.

В ходе анализа существующих разработок выявлены преимущества и недостатки конкурентов. Этот опыт будет использован для оптимальной интеграции в разрабатываемую информационную систему, способствуя повышению ее эффективности.

В рамках аналитического раздела были рассмотрены важные аспекты информационного, математического и технического обеспечения для успешной реализации задач по поддержке интернет-продаж предприятий электронной коммерции.

Информационное обеспечение представлено через логическую модель данных, классификаторы, систему кодирования, а также нормативно-справочную и входную информацию. Эти элементы позволяют структурировать и систематизировать данные, обеспечивая их доступность и целостность в рамках информационной системы.
