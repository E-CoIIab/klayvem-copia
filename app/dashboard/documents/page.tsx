"use client";

import { motion } from "framer-motion";
import { FileText, Download, Share2, MoreVertical } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function DocumentsPage() {
  const documents = [
    { id: 1, name: "Relatório de Impacto 2024.pdf", size: "2.4 MB", date: "15/11/2024", type: "PDF" },
    { id: 2, name: "Apresentação Projeto Verde.pptx", size: "5.1 MB", date: "10/11/2024", type: "PPTX" },
    { id: 3, name: "Planilha de Custos.xlsx", size: "890 KB", date: "08/11/2024", type: "XLSX" },
    { id: 4, name: "Manual de Procedimentos.docx", size: "1.2 MB", date: "05/11/2024", type: "DOCX" },
    { id: 5, name: "Fotos do Evento.zip", size: "45 MB", date: "01/11/2024", type: "ZIP" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documentos</h1>
          <p className="text-muted-foreground">
            Seus arquivos e documentos compartilhados
          </p>
        </div>
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>

      {/* Documents List */}
      <div className="space-y-3">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate">{doc.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {doc.size} • {doc.date}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

