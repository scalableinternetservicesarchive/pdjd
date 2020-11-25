- [pdjd](#pdjd)
- [Baseline](#baseline)
  - [List of optimizations](#list-of-optimizations)

## pdjd

| Name            | Photo                              |
| --------------- | ---------------------------------- |
| David Zhao      | <img src="profiles/davidzhao.jpg"> |
| Parham Hajzavar | <img src="profiles/parham.jpg">    |
| Jonathan Khamis | <img src="profiles/jonathan.jpg">  |
| Duy Duong       |                                    |


## Baseline

Baseline performance benchmarks for pdjd's web app. Cherry-pick the commits below to include optimizations. This branch will be keep up to date with load tests/ data changes, but no optimizations will be applied here.

### List of optimizations

| ID  | Name                     | Commit                                   |
| --- | ------------------------ | ---------------------------------------- |
| 1   | TypeORM connection Limit | e314aca5d1c62d483149d2aef3b009fe442836ee |
| 2   | SchemaLink               | e314aca5d1c62d483149d2aef3b009fe442836ee |
| 3   | Redis for Home Page      | e16cc6b0718e895a3c488c90d44891ee92097042 |
| 4   | Redis for Session        | e335b5d640a46739c9ad4a269680e95620d90889 |
