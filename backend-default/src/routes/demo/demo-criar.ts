import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { nanoid } from 'nanoid';
import { demoRepository, PK_DEMO_SIZE } from '~/models';

const router = Router();

router.post(
  '/demo',
  [
    body('descricao')
      .trim()
      .notEmpty()
      .withMessage('É necessário informar a descricao'),
  ],
  async (req: Request, res: Response) => {
    const { descricao } = req.body;

    const demo = await demoRepository.save({
      cdDemo: nanoid(PK_DEMO_SIZE),
      deDescricao: descricao,
    });

    res.status(201).send(demo);
  }
);

export { router as criarDemoRouter };
