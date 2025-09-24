
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { TShirtIcon } from "@/components/icons/t-shirt-icon";
import { TrousersIcon } from "@/components/icons/trousers-icon";
import { JacketIcon } from "@/components/icons/jacket-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal, Eye, EyeOff, Loader2, Shirt, Redo, Undo, Diamond, Milestone, Hand, Wind } from "lucide-react";
import { auth, db } from "@/lib/firebase/client-app";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Separator } from "./ui/separator";

const stepOneSchema = z.object({
  name: z.string().min(2, { message: "Le nom est requis." }),
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  phone: z.string().min(10, { message: "Numéro de téléphone invalide." }),
  address: z.string().min(5, { message: "L'adresse est requise." }),
  zipCode: z.string().length(5, { message: "Le code postal doit comporter 5 chiffres." }),
  createAccount: z.boolean().default(true),
  password: z.string().optional(),
}).refine(data => {
    if (data.createAccount && (!data.password || data.password.length < 8)) {
        return false;
    }
    return true;
}, {
    message: "Le mot de passe doit contenir au moins 8 caractères.",
    path: ["password"],
});

const stepTwoSchema = z.object({
  items: z.array(z.object({
    id: z.string(),
    name: z.string(),
    icon: z.any(),
    quantity: z.number().min(0),
    category: z.string(),
  })).refine(items => items.some(item => item.quantity > 0), { message: "Veuillez sélectionner au moins un article." }),
  stainRemoval: z.boolean().default(false),
  delicateWash: z.boolean().default(false),
  specialInstructions: z.string().optional(),
});

const stepThreeSchema = z.object({
  pickupDate: z.date({ required_error: "Veuillez sélectionner une date de collecte." }),
  pickupSlot: z.string({ required_error: "Veuillez sélectionner un créneau de collecte." }),
  deliveryDate: z.date({ required_error: "Veuillez sélectionner une date de livraison." }),
  deliverySlot: z.string({ required_error: "Veuillez sélectionner un créneau de livraison." }),
  whatsappConfirm: z.boolean().default(false),
});

const formSchema = z.intersection(z.intersection(stepOneSchema, stepTwoSchema), stepThreeSchema)
  .refine(data => {
    if (data.pickupDate && data.deliveryDate) {
        return data.deliveryDate > data.pickupDate;
    }
    return true;
  }, {
    message: "La date de livraison doit être postérieure à la date de collecte.",
    path: ["deliveryDate"],
  });


type FormValues = z.infer<typeof formSchema>;

const availableTimeSlots = ["09:00 - 11:00", "11:00 - 13:00", "14:00 - 16:00", "16:00 - 18:00"];
const validZipCodes = ["75001", "75002", "75003", "75004", "75005", "75006", "75007", "75008"];

const clothingItems = [
  // Hauts
  { id: 'tshirt', name: 'T-Shirts', icon: TShirtIcon, category: "Hauts" },
  { id: 'chemise', name: 'Chemises', icon: Shirt, category: "Hauts" },
  { id: 'blouse', name: 'Blouses', icon: Hand, category: "Hauts" }, // Placeholder icon
  { id: 'pull', name: 'Pulls', icon: Wind, category: "Hauts" }, // Placeholder icon
  // Bas
  { id: 'jeans', name: 'Jeans', icon: TrousersIcon, category: "Bas" },
  { id: 'trousers', name: 'Pantalons', icon: TrousersIcon, category: "Bas" },
  { id: 'short', name: 'Shorts', icon: TrousersIcon, category: "Bas" },
  { id: 'jupe', name: 'Jupes', icon: Redo, category: "Bas" }, // Placeholder icon
  // Pièces Uniques
  { id: 'robe_simple', name: 'Robe Simple', icon: Undo, category: "Pièces Uniques" }, // Placeholder icon
  { id: 'robe_speciale', name: 'Robe (avec pierres)', icon: Diamond, category: "Pièces Uniques" },
  { id: 'costume', name: 'Costumes', icon: Milestone, category: "Pièces Uniques" }, // Placeholder icon
  // Vestes & Manteaux
  { id: 'jacket', name: 'Vestes', icon: JacketIcon, category: "Vestes & Manteaux" },
  { id: 'blouson', name: 'Blousons', icon: JacketIcon, category: "Vestes & Manteaux" },
  { id: 'manteau', name: 'Manteaux', icon: JacketIcon, category: "Vestes & Manteaux" },
  // Tissus
  { id: 'tissu', name: 'Tissus au mètre', icon: Shirt, category: "Tissus & Linge" },
  { id: 'drap', name: 'Draps', icon: Shirt, category: "Tissus & Linge" },
  { id: 'serviette', name: 'Serviettes', icon: Shirt, category: "Tissus & Linge" },
];

export function OrderForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zipCode: "",
      createAccount: true,
      password: "",
      items: clothingItems.map(item => ({ ...item, quantity: 0 })),
      stainRemoval: false,
      delicateWash: false,
      specialInstructions: "",
      whatsappConfirm: false,
    },
  });

  const handleNext = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ["name", "email", "phone", "address", "zipCode"];
      if(form.getValues("createAccount")) {
        fieldsToValidate.push("password");
      }
    }
    if (step === 2) fieldsToValidate = ["items"];
    if (step === 3) fieldsToValidate = ["pickupDate", "pickupSlot", "deliveryDate", "deliverySlot"];

    const isValid = await form.trigger(fieldsToValidate);

    if (isValid) {
       if (step === 1) {
        const zipCode = form.getValues("zipCode");
        if (!validZipCodes.includes(zipCode)) {
          toast({
            variant: "destructive",
            title: "Zone non desservie",
            description: "Désolé, nous ne livrons pas encore dans votre zone.",
          });
          return;
        }
      }
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setStep((prev) => prev - 1);
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    toast({
        title: "Commande en cours de création",
        description: "Nous finalisons votre commande...",
    });

    try {
      let userId: string | null = auth.currentUser?.uid || null;

      // Create user if checkbox is checked and not already logged in
      if (data.createAccount && !userId) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password!);
          await updateProfile(userCredential.user, { displayName: data.name });
          userId = userCredential.user.uid;
          toast({ title: "Compte créé avec succès", description: "Votre commande est en cours de finalisation." });
        } catch (error: any) {
            let description = "Une erreur est survenue lors de la création du compte.";
            if (error.code === 'auth/email-already-in-use') {
                description = "Cette adresse e-mail est déjà utilisée. Veuillez vous connecter ou utiliser une autre adresse."
            }
            toast({ variant: "destructive", title: "Erreur d'inscription", description });
            setIsSubmitting(false);
            return;
        }
      }
      
      if (!userId) {
        toast({ variant: "destructive", title: "Utilisateur non connecté", description: "Veuillez vous connecter ou créer un compte pour commander." });
        setIsSubmitting(false);
        // Optionally redirect to login
        // router.push('/login'); 
        return;
      }

      // Save order to Firestore
      const { createAccount, password, ...orderData } = data;
      const orderPayload = {
        ...orderData,
        userId: userId,
        status: "En cours de traitement",
        items: data.items.filter(item => item.quantity > 0).map(({icon, ...rest}) => rest), // Don't store icon component
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(collection(db, "orders"), orderPayload);
      
      router.push(`/order/success/${docRef.id}`);

    } catch (error) {
        console.error("Order submission error: ", error);
        toast({ variant: "destructive", title: "Erreur", description: "Impossible de créer la commande." });
        setIsSubmitting(false);
    }
  };

  const progressValue = (step / 4) * 100;

  return (
    <Card className="shadow-lg">
      <CardContent className="p-6 md:p-8">
        <Progress value={progressValue} className="mb-8" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <AnimatePresence mode="wait">
              {step === 1 && <StepOneContent form={form} />}
              {step === 2 && <StepTwoContent form={form} />}
              {step === 3 && <StepThreeContent form={form} />}
              {step === 4 && <StepFourContent values={form.getValues()} />}
            </AnimatePresence>

            <div className="flex justify-between items-center pt-4">
              {step > 1 ? (
                <Button type="button" variant="outline" onClick={handleBack} disabled={isSubmitting}>
                  Retour
                </Button>
              ) : <div />}
              {step < 4 ? (
                <Button type="button" onClick={handleNext} disabled={isSubmitting}>
                  Suivant
                </Button>
              ) : (
                <Button type="submit" disabled={isSubmitting}>
                   {isSubmitting ? <Loader2 className="animate-spin" /> : 'Confirmer et commander'}
                </Button>
              )}
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

const motionProps = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
  transition: { duration: 0.3 },
};

function StepOneContent({ form }: { form: any }) {
  const { control, watch } = form;
  const createAccount = watch("createAccount");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <motion.div {...motionProps} className="space-y-4">
      <h3 className="text-xl font-semibold">Vos informations</h3>
      <FormField control={control} name="name" render={({ field }) => (
        <FormItem>
          <FormLabel>Nom complet</FormLabel>
          <FormControl><Input placeholder="Jean Dupont" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField control={control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl><Input placeholder="jean.dupont@email.com" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
        <FormField control={control} name="phone" render={({ field }) => (
          <FormItem>
            <FormLabel>Téléphone</FormLabel>
            <FormControl><Input placeholder="0612345678" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />
      </div>
      <FormField control={control} name="address" render={({ field }) => (
        <FormItem>
          <FormLabel>Adresse de collecte/livraison</FormLabel>
          <FormControl><Input placeholder="123 Rue de la République" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
      <FormField control={control} name="zipCode" render={({ field }) => (
        <FormItem>
          <FormLabel>Code Postal</FormLabel>
          <FormControl><Input placeholder="75001" {...field} /></FormControl>
          <FormMessage />
        </FormItem>
      )} />
       <FormField control={control} name="createAccount" render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
            <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
            <div className="space-y-1 leading-none">
                <FormLabel>Créer un compte pour suivre mes commandes</FormLabel>
            </div>
        </FormItem>
      )} />
      {createAccount && (
        <FormField control={control} name="password" render={({ field }) => (
            <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <div className="relative">
                    <FormControl><Input type={showPassword ? "text" : "password"} placeholder="8+ caractères" {...field} /></FormControl>
                    <Button type="button" variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                </div>
                <FormMessage />
            </FormItem>
        )} />
      )}
    </motion.div>
  );
}

function StepTwoContent({ form }: { form: any }) {
    const { control, watch, setValue, formState: { errors } } = form;
    const items = watch("items");

    const updateQuantity = (index: number, delta: number) => {
        const currentQuantity = items[index].quantity;
        const newQuantity = Math.max(0, currentQuantity + delta);
        setValue(`items.${index}.quantity`, newQuantity, { shouldValidate: true });
    };

    const categories = clothingItems.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, typeof clothingItems>);

    return (
        <motion.div {...motionProps} className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold">Vos vêtements</h3>
                <p className="text-sm text-muted-foreground">Indiquez la quantité pour chaque type d'article.</p>
            </div>

            <div className="space-y-6">
                {Object.entries(categories).map(([category, itemsInCategory]) => (
                    <div key={category}>
                        <h4 className="text-lg font-medium mb-3">{category}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {items.map((item: any, index: number) => {
                                if (item.category !== category) return null;
                                return (
                                    <div key={item.id} className="border rounded-lg p-3 flex flex-col items-center justify-between">
                                        <div className="text-center">
                                            <item.icon className="w-10 h-10 mx-auto mb-2 text-primary" />
                                            <p className="text-sm font-medium">{item.name}</p>
                                        </div>
                                        <div className="flex items-center justify-center gap-2 mt-3">
                                            <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(index, -1)}>-</Button>
                                            <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                                            <Button type="button" size="icon" variant="outline" className="h-7 w-7" onClick={() => updateQuantity(index, 1)}>+</Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {errors.items && <p className="text-sm font-medium text-destructive">{errors.items.message as string}</p>}
            
            <Separator />

            <div>
                <h3 className="text-xl font-semibold">Demandes spéciales</h3>
                <div className="space-y-2 mt-2">
                    <FormField control={control} name="stainRemoval" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Traitement des taches</FormLabel></div></FormItem>
                    )} />
                    <FormField control={control} name="delicateWash" render={({ field }) => (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Lavage délicat</FormLabel></div></FormItem>
                    )} />
                </div>
            </div>
            <FormField control={control} name="specialInstructions" render={({ field }) => (
                <FormItem>
                <FormLabel>Instructions supplémentaires (optionnel)</FormLabel>
                <FormControl><Textarea placeholder="Ex: Chemise blanche à laver séparément..." {...field} /></FormControl>
                </FormItem>
            )} />
        </motion.div>
    );
}

function StepThreeContent({ form }: { form: any }) {
  return (
    <motion.div {...motionProps} className="space-y-6">
      <h3 className="text-xl font-semibold">Planification</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <FormField control={form.control} name="pickupDate" render={({ field }) => (
            <FormItem className="flex flex-col items-center"><FormLabel className="font-semibold text-center w-full mb-2">Date de collecte</FormLabel><FormControl><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date(new Date().setDate(new Date().getDate() - 1))} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="pickupSlot" render={({ field }) => (
            <FormItem><FormLabel>Créneau de collecte</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Choisissez un créneau" /></SelectTrigger></FormControl><SelectContent>{availableTimeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
            )} />
        </div>
        <div className="space-y-4">
             <FormField control={form.control} name="deliveryDate" render={({ field }) => (
            <FormItem className="flex flex-col items-center"><FormLabel className="font-semibold text-center w-full mb-2">Date de livraison</FormLabel><FormControl><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < (form.getValues("pickupDate") || new Date())} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="deliverySlot" render={({ field }) => (
            <FormItem><FormLabel>Créneau de livraison</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Choisissez un créneau" /></SelectTrigger></FormControl><SelectContent>{availableTimeSlots.map(slot => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}</SelectContent></Select><FormMessage /></FormItem>
            )} />
        </div>
      </div>
      <FormField control={form.control} name="whatsappConfirm" render={({ field }) => (
        <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4"><FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl><div className="space-y-1 leading-none"><FormLabel>Recevoir les notifications par WhatsApp</FormLabel></div></FormItem>
      )} />
    </motion.div>
  );
}

function StepFourContent({ values }: { values: FormValues }) {
  const totalItems = values.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.div {...motionProps} className="space-y-6">
      <h3 className="text-xl font-semibold">Récapitulatif de votre commande</h3>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Veuillez vérifier vos informations</AlertTitle>
        <AlertDescription>
          Une fois la commande confirmée, votre compte sera créé et vous ne pourrez plus la modifier.
        </AlertDescription>
      </Alert>
      <div className="space-y-4 rounded-md border p-4 bg-secondary/50">
        <div><h4 className="font-semibold">Informations</h4><p className="text-sm text-muted-foreground">{values.name} | {values.email} | {values.phone}</p><p className="text-sm text-muted-foreground">{values.address}, {values.zipCode}</p></div>
        <div><h4 className="font-semibold">Articles ({totalItems})</h4>
          <ul className="list-disc list-inside text-sm text-muted-foreground">{values.items.filter(i => i.quantity > 0).map(item => (<li key={item.id}>{item.name}: {item.quantity}</li>))}</ul>
        </div>
        <div><h4 className="font-semibold">Collecte</h4><p className="text-sm text-muted-foreground">{values.pickupDate?.toLocaleDateString('fr-FR')} à {values.pickupSlot}</p></div>
        <div><h4 className="font-semibold">Livraison</h4><p className="text-sm text-muted-foreground">{values.deliveryDate?.toLocaleDateString('fr-FR')} à {values.deliverySlot}</p></div>
      </div>
    </motion.div>
  );
}

    